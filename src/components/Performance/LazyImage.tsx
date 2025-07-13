'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  sizes?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  onLoad?: () => void
  onError?: () => void
  loading?: 'lazy' | 'eager'
  fallbackSrc?: string
  showLoadingSpinner?: boolean
  aspectRatio?: string
  rounded?: boolean
  shadow?: boolean
  overlay?: boolean
  overlayColor?: string
  hover?: boolean
  zoomOnHover?: boolean
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  quality = 75,
  sizes,
  objectFit = 'cover',
  onLoad,
  onError,
  loading = 'lazy',
  fallbackSrc,
  showLoadingSpinner = true,
  aspectRatio,
  rounded = false,
  shadow = false,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  hover = false,
  zoomOnHover = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  // Generate blur data URL if not provided
  const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, width, height)
    }
    
    return canvas.toDataURL()
  }

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setIsError(true)
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setIsError(false)
    } else {
      onError?.()
    }
  }

  const containerClasses = cn(
    'relative overflow-hidden',
    aspectRatio && `aspect-[${aspectRatio}]`,
    rounded && 'rounded-lg',
    shadow && 'shadow-lg',
    className
  )

  const imageClasses = cn(
    'transition-all duration-300 ease-in-out',
    !isLoaded && 'scale-110 blur-sm',
    isLoaded && 'scale-100 blur-0',
    zoomOnHover && 'hover:scale-105',
    hover && 'hover:brightness-110'
  )

  // Loading placeholder
  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 animate-pulse">
      {showLoadingSpinner && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )

  // Error placeholder
  const ErrorPlaceholder = () => (
    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-neutral-400 dark:text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          이미지를 불러올 수 없습니다
        </p>
      </div>
    </div>
  )

  return (
    <div ref={imgRef} className={containerClasses}>
      {/* Show placeholder until image is in view */}
      {!isInView && <LoadingPlaceholder />}
      
      {/* Show error placeholder if image failed to load */}
      {isError && <ErrorPlaceholder />}
      
      {/* Main image */}
      {isInView && !isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL || generateBlurDataURL()}
            quality={quality}
            sizes={sizes}
            loading={loading}
            className={cn(
              imageClasses,
              fill ? 'object-cover' : `object-${objectFit}`
            )}
            onLoad={handleLoad}
            onError={handleError}
          />
          
          {/* Overlay */}
          {overlay && (
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: overlayColor }}
            />
          )}
        </motion.div>
      )}
      
      {/* Loading spinner overlay */}
      <AnimatePresence>
        {!isLoaded && isInView && !isError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80"
          >
            <div className="w-6 h-6 border-2 border-coral-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Utility function to generate responsive sizes
export const generateSizes = (breakpoints: {
  default: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) => {
  const sizes = []
  
  if (breakpoints['2xl']) sizes.push(`(min-width: 1536px) ${breakpoints['2xl']}`)
  if (breakpoints.xl) sizes.push(`(min-width: 1280px) ${breakpoints.xl}`)
  if (breakpoints.lg) sizes.push(`(min-width: 1024px) ${breakpoints.lg}`)
  if (breakpoints.md) sizes.push(`(min-width: 768px) ${breakpoints.md}`)
  if (breakpoints.sm) sizes.push(`(min-width: 640px) ${breakpoints.sm}`)
  
  sizes.push(breakpoints.default)
  
  return sizes.join(', ')
}

// Presets for common use cases
export const ImagePresets = {
  hero: {
    priority: true,
    quality: 90,
    sizes: generateSizes({
      default: '100vw',
      md: '100vw',
      lg: '100vw'
    })
  },
  
  thumbnail: {
    quality: 75,
    sizes: generateSizes({
      default: '300px',
      md: '400px',
      lg: '500px'
    })
  },
  
  gallery: {
    quality: 80,
    sizes: generateSizes({
      default: '100vw',
      sm: '50vw',
      md: '33vw',
      lg: '25vw'
    })
  },
  
  avatar: {
    quality: 85,
    sizes: generateSizes({
      default: '64px',
      md: '80px',
      lg: '96px'
    })
  }
}

export type { LazyImageProps } 