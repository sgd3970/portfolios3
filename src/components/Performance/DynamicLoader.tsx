'use client'

import { Suspense, lazy, ComponentType, ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DynamicLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  errorFallback?: ReactNode
  className?: string
  delay?: number
  showProgress?: boolean
  retryButton?: boolean
  onRetry?: () => void
}

// Loading component with different variants
export const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...',
  variant = 'default',
  className 
}: {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  variant?: 'default' | 'dots' | 'pulse' | 'skeleton'
  className?: string
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-2', className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-coral-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        {text && (
          <span className={cn(textSizeClasses[size], 'text-neutral-600 dark:text-neutral-400')}>
            {text}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center justify-center space-x-3', className)}>
        <motion.div
          className={cn(sizeClasses[size], 'bg-coral-500 rounded-full')}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        />
        {text && (
          <span className={cn(textSizeClasses[size], 'text-neutral-600 dark:text-neutral-400')}>
            {text}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('animate-pulse space-y-4', className)}>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center space-x-3', className)}>
      <Loader2 className={cn(sizeClasses[size], 'animate-spin text-coral-500')} />
      {text && (
        <span className={cn(textSizeClasses[size], 'text-neutral-600 dark:text-neutral-400')}>
          {text}
        </span>
      )}
    </div>
  )
}

// Error boundary component
export const ErrorFallback = ({ 
  error, 
  onRetry, 
  showRetry = true,
  className 
}: {
  error?: Error
  onRetry?: () => void
  showRetry?: boolean
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
        {error?.message || 'Failed to load component. Please try again.'}
      </p>
      {showRetry && onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
        >
          Try Again
        </motion.button>
      )}
    </div>
  )
}

// Main dynamic loader component
export default function DynamicLoader({
  children,
  fallback,
  errorFallback,
  className,
  delay = 0,
  showProgress = false,
  retryButton = true,
  onRetry
}: DynamicLoaderProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center min-h-[200px]">
      <LoadingSpinner text="Loading component..." />
    </div>
  )

  const defaultErrorFallback = (
    <ErrorFallback onRetry={onRetry} showRetry={retryButton} />
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </motion.div>
  )
}

// Utility function to create dynamic components
export const createDynamicComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    fallback?: ReactNode
    errorFallback?: ReactNode
    ssr?: boolean
    preload?: boolean
  } = {}
) => {
  const DynamicComponent = lazy(importFunc)
  
  // Preload the component if requested
  if (options.preload) {
    importFunc()
  }

  return (props: React.ComponentProps<T>) => (
    <DynamicLoader
      fallback={options.fallback}
      errorFallback={options.errorFallback}
    >
      <DynamicComponent {...props} />
    </DynamicLoader>
  )
}

// Preload utility for route-based code splitting
export const preloadRoute = (routeImport: () => Promise<any>) => {
  const link = document.createElement('link')
  link.rel = 'modulepreload'
  link.href = routeImport.toString()
  document.head.appendChild(link)
}

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // You can send this to your analytics service
    console.log(metric)
  }
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, options])

  return isIntersecting
}

// Component presets for common use cases
export const DynamicPresets = {
  // For heavy components that should be loaded lazily
  heavy: {
    fallback: (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    ),
    ssr: false,
    preload: false
  },
  
  // For modal components
  modal: {
    fallback: (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-8">
          <LoadingSpinner text="Loading modal..." />
        </div>
      </div>
    ),
    ssr: false,
    preload: false
  },
  
  // For chart/visualization components
  chart: {
    fallback: (
      <div className="w-full h-64 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
        <LoadingSpinner variant="skeleton" />
      </div>
    ),
    ssr: false,
    preload: false
  },
  
  // For admin/dashboard components
  admin: {
    fallback: (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    ),
    ssr: false,
    preload: true
  }
}

export type { DynamicLoaderProps } 