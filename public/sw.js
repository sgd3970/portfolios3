const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_CACHE_NAME = 'portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add critical CSS and JS files here
];

// Files to cache on first use
const DYNAMIC_FILES = [
  '/projects',
  '/about',
  '/contact',
  '/videos/',
  '/images/',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, then network
  cacheFirst: ['/_next/static/', '/icons/', '/images/', '/videos/'],
  // Network first, then cache
  networkFirst: ['/api/', '/projects/', '/about/', '/contact/'],
  // Stale while revalidate
  staleWhileRevalidate: ['/'],
};

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static files:', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Handle different cache strategies
  event.respondWith(
    handleRequest(event.request, url)
  );
});

// Handle different caching strategies
async function handleRequest(request, url) {
  const pathname = url.pathname;
  
  try {
    // Cache first strategy
    if (shouldUseCacheFirst(pathname)) {
      return await cacheFirst(request);
    }
    
    // Network first strategy
    if (shouldUseNetworkFirst(pathname)) {
      return await networkFirst(request);
    }
    
    // Stale while revalidate strategy
    if (shouldUseStaleWhileRevalidate(pathname)) {
      return await staleWhileRevalidate(request);
    }
    
    // Default to network first
    return await networkFirst(request);
  } catch (error) {
    console.error('Service Worker: Request failed:', error);
    return await getCachedResponse(request) || createErrorResponse();
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    cache.put(request, response.clone());
  }
  
  return response;
}

// Network first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const networkResponse = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    // Network failed, return cached if available
    return cached;
  });
  
  // Return cached immediately if available, otherwise wait for network
  return cached || networkResponse;
}

// Helper functions
function shouldUseCacheFirst(pathname) {
  return CACHE_STRATEGIES.cacheFirst.some(pattern => pathname.startsWith(pattern));
}

function shouldUseNetworkFirst(pathname) {
  return CACHE_STRATEGIES.networkFirst.some(pattern => pathname.startsWith(pattern));
}

function shouldUseStaleWhileRevalidate(pathname) {
  return CACHE_STRATEGIES.staleWhileRevalidate.some(pattern => pathname.startsWith(pattern));
}

async function getCachedResponse(request) {
  return await caches.match(request);
}

function createErrorResponse() {
  return new Response(
    JSON.stringify({
      error: 'Network error and no cached version available',
      message: 'Please check your internet connection and try again.'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingForms();
    
    for (const form of pendingForms) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data)
        });
        
        // Remove from pending after successful submission
        await removePendingForm(form.id);
      } catch (error) {
        console.error('Failed to sync form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: 'New project added to portfolio!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Projects',
        icon: '/icons/projects-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/projects')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Share target handling
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname === '/share' && event.request.method === 'POST') {
    event.respondWith(handleShareTarget(event.request));
  }
});

async function handleShareTarget(request) {
  const formData = await request.formData();
  const title = formData.get('title');
  const text = formData.get('text');
  const url = formData.get('url');
  const file = formData.get('file');
  
  // Process shared content
  console.log('Shared content:', { title, text, url, file });
  
  // Redirect to the app with shared content
  return Response.redirect('/?shared=true', 303);
}

// Placeholder functions for IndexedDB operations
async function getPendingForms() {
  // Implementation would use IndexedDB
  return [];
}

async function removePendingForm(id) {
  // Implementation would use IndexedDB
  console.log('Removing pending form:', id);
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Service Worker: Script loaded successfully'); 