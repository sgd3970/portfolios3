'use client'

// PWA utility functions
export const pwaUtils = {
  // Check if PWA is supported
  isSupported: (): boolean => {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator
  },

  // Register service worker
  registerServiceWorker: async (): Promise<ServiceWorkerRegistration | null> => {
    if (!pwaUtils.isSupported()) {
      console.log('PWA: Service Worker not supported')
      return null
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      })

      console.log('PWA: Service Worker registered successfully')

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              console.log('PWA: New service worker available')
              pwaUtils.showUpdateNotification()
            }
          })
        }
      })

      return registration
    } catch (error) {
      console.error('PWA: Service Worker registration failed:', error)
      return null
    }
  },

  // Unregister service worker
  unregisterServiceWorker: async (): Promise<boolean> => {
    if (!pwaUtils.isSupported()) {
      return false
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.unregister()
        console.log('PWA: Service Worker unregistered')
        return true
      }
      return false
    } catch (error) {
      console.error('PWA: Service Worker unregistration failed:', error)
      return false
    }
  },

  // Check if app is running in standalone mode
  isStandalone: (): boolean => {
    return typeof window !== 'undefined' && (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    )
  },

  // Check if app can be installed
  canInstall: (): boolean => {
    return typeof window !== 'undefined' && 'BeforeInstallPromptEvent' in window
  },

  // Show install prompt
  showInstallPrompt: async (deferredPrompt: any): Promise<boolean> => {
    if (!deferredPrompt) {
      return false
    }

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log('PWA: Install prompt outcome:', outcome)
      return outcome === 'accepted'
    } catch (error) {
      console.error('PWA: Install prompt failed:', error)
      return false
    }
  },

  // Show update notification
  showUpdateNotification: (): void => {
    if (typeof window === 'undefined') return

    const notification = document.createElement('div')
    notification.innerHTML = `
      <div class="fixed bottom-4 right-4 bg-coral-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <div>
            <p class="font-semibold">Update Available</p>
            <p class="text-sm opacity-90">New version of the app is ready</p>
          </div>
        </div>
        <div class="mt-3 flex space-x-2">
          <button id="pwa-update-btn" class="px-3 py-1 bg-white text-coral-500 rounded text-sm font-medium hover:bg-gray-100">
            Update
          </button>
          <button id="pwa-dismiss-btn" class="px-3 py-1 border border-white/30 rounded text-sm hover:bg-white/10">
            Later
          </button>
        </div>
      </div>
    `

    document.body.appendChild(notification)

    // Add event listeners
    const updateBtn = document.getElementById('pwa-update-btn')
    const dismissBtn = document.getElementById('pwa-dismiss-btn')

    updateBtn?.addEventListener('click', () => {
      window.location.reload()
    })

    dismissBtn?.addEventListener('click', () => {
      document.body.removeChild(notification)
    })

    // Auto dismiss after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 10000)
  },

  // Request persistent storage
  requestPersistentStorage: async (): Promise<boolean> => {
    if (!('storage' in navigator && 'persist' in navigator.storage)) {
      return false
    }

    try {
      const isPersistent = await navigator.storage.persist()
      console.log('PWA: Persistent storage:', isPersistent)
      return isPersistent
    } catch (error) {
      console.error('PWA: Persistent storage request failed:', error)
      return false
    }
  },

  // Get storage usage
  getStorageUsage: async (): Promise<{ usage: number; quota: number } | null> => {
    if (!('storage' in navigator && 'estimate' in navigator.storage)) {
      return null
    }

    try {
      const estimate = await navigator.storage.estimate()
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0
      }
    } catch (error) {
      console.error('PWA: Storage usage estimation failed:', error)
      return null
    }
  },

  // Share content
  shareContent: async (shareData: {
    title?: string
    text?: string
    url?: string
    files?: File[]
  }): Promise<boolean> => {
    if (!('share' in navigator)) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url || window.location.href)
        console.log('PWA: Content copied to clipboard')
        return true
      } catch (error) {
        console.error('PWA: Share fallback failed:', error)
        return false
      }
    }

    try {
      await navigator.share(shareData)
      console.log('PWA: Content shared successfully')
      return true
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('PWA: Share failed:', error)
      }
      return false
    }
  },

  // Check network status
  getNetworkStatus: (): {
    isOnline: boolean
    connectionType: string
    effectiveType: string
    downlink: number
    rtt: number
    saveData: boolean
  } => {
    const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection

    return {
      isOnline: navigator.onLine,
      connectionType: connection?.type || 'unknown',
      effectiveType: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      saveData: connection?.saveData || false
    }
  },

  // Background sync
  registerBackgroundSync: async (tag: string): Promise<void> => {
    if (!('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype)) {
      console.log('PWA: Background sync not supported')
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register(tag)
      console.log('PWA: Background sync registered:', tag)
    } catch (error) {
      console.error('PWA: Background sync registration failed:', error)
    }
  },

  // Push notifications
  requestNotificationPermission: async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      console.log('PWA: Notifications not supported')
      return 'denied'
    }

    try {
      const permission = await Notification.requestPermission()
      console.log('PWA: Notification permission:', permission)
      return permission
    } catch (error) {
      console.error('PWA: Notification permission request failed:', error)
      return 'denied'
    }
  },

  // Subscribe to push notifications
  subscribeToPushNotifications: async (vapidKey: string): Promise<PushSubscription | null> => {
    if (!('serviceWorker' in navigator && 'PushManager' in window)) {
      console.log('PWA: Push notifications not supported')
      return null
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey
      })

      console.log('PWA: Push notification subscription:', subscription)
      return subscription
    } catch (error) {
      console.error('PWA: Push notification subscription failed:', error)
      return null
    }
  },

  // Add to home screen
  addToHomeScreen: (deferredPrompt: any): void => {
    if (!deferredPrompt) {
      console.log('PWA: Install prompt not available')
      return
    }

    pwaUtils.showInstallPrompt(deferredPrompt)
  },

  // Clear app data
  clearAppData: async (): Promise<void> => {
    try {
      // Clear caches
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      )

      // Clear localStorage
      localStorage.clear()

      // Clear sessionStorage
      sessionStorage.clear()

      // Clear IndexedDB (if used)
      if ('indexedDB' in window) {
        // Implementation depends on your IndexedDB usage
      }

      console.log('PWA: App data cleared')
    } catch (error) {
      console.error('PWA: Failed to clear app data:', error)
    }
  }
}

// Hook for PWA features
export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Check if already installed
    setIsInstalled(pwaUtils.isStandalone())

    // Register service worker
    pwaUtils.registerServiceWorker()

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    // Listen for app installation
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      const accepted = await pwaUtils.showInstallPrompt(deferredPrompt)
      if (accepted) {
        setIsInstallable(false)
        setDeferredPrompt(null)
      }
    }
  }

  const shareContent = async (shareData: {
    title?: string
    text?: string
    url?: string
    files?: File[]
  }) => {
    return await pwaUtils.shareContent(shareData)
  }

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    shareContent,
    networkStatus: pwaUtils.getNetworkStatus()
  }
}

// Import necessary hooks
import { useState, useEffect } from 'react'

export default pwaUtils 