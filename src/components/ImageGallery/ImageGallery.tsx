'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Grid, List, Share } from 'lucide-react'
import Button from '../UI/Button'
import Card from '../UI/Card'
import { cn } from '@/lib/utils'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  width?: number
  height?: number
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  className?: string
  columns?: number
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  showThumbnails?: boolean
  showCaption?: boolean
  showControls?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  enableDownload?: boolean
  enableShare?: boolean
  layout?: 'grid' | 'masonry' | 'carousel'
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto'
}

export default function ImageGallery({
  images,
  className,
  columns = 3,
  spacing = 'md',
  showThumbnails = true,
  showCaption = true,
  showControls = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  enableDownload = false,
  enableShare = false,
  layout = 'grid',
  aspectRatio = 'auto'
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && selectedIndex !== null) {
      const interval = setInterval(() => {
        setSelectedIndex((prev) => 
          prev === null ? 0 : (prev + 1) % images.length
        )
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, selectedIndex, images.length, autoPlayInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      switch (e.key) {
        case 'Escape':
          setSelectedIndex(null)
          break
        case 'ArrowLeft':
          setSelectedIndex((prev) => 
            prev === null ? 0 : prev === 0 ? images.length - 1 : prev - 1
          )
          break
        case 'ArrowRight':
          setSelectedIndex((prev) => 
            prev === null ? 0 : (prev + 1) % images.length
          )
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, images.length])

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId))
    setIsLoading(null)
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => 
      prev === null ? 0 : (prev + 1) % images.length
    )
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => 
      prev === null ? 0 : prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const handleDownload = async (image: GalleryImage) => {
    if (!enableDownload) return

    try {
      const response = await fetch(image.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${image.title || 'image'}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }

  const handleShare = async (image: GalleryImage) => {
    if (!enableShare) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || 'Image',
          text: image.description || 'Check out this image',
          url: image.src
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(image.src)
    }
  }

  const getSpacingClass = () => {
    switch (spacing) {
      case 'none': return 'gap-0'
      case 'sm': return 'gap-2'
      case 'md': return 'gap-4'
      case 'lg': return 'gap-6'
      default: return 'gap-4'
    }
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square'
      case 'landscape': return 'aspect-video'
      case 'portrait': return 'aspect-[3/4]'
      case 'auto': return ''
      default: return ''
    }
  }

  const renderGrid = () => (
    <div 
      className={cn(
        'grid auto-rows-fr',
        getSpacingClass(),
        `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`
      )}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
          onClick={() => handleImageClick(index)}
        >
          <Card className="overflow-hidden h-full group">
            <div className={cn("relative bg-neutral-100 dark:bg-neutral-800", getAspectRatioClass())}>
              {!loadedImages.has(image.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
                </div>
              )}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-cover transition-all duration-300 group-hover:scale-105",
                  loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                )}
                onLoadingComplete={() => handleImageLoad(image.id)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
            {showCaption && (image.caption || image.title) && (
              <div className="p-3">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {image.caption || image.title}
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderMasonry = () => (
    <div 
      className={cn(
        'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
        getSpacingClass()
      )}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="break-inside-avoid mb-4 cursor-pointer"
          onClick={() => handleImageClick(index)}
        >
          <Card className="overflow-hidden group">
            <div className="relative bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 400}
                height={image.height || 300}
                className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                onLoadingComplete={() => handleImageLoad(image.id)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
            {showCaption && (image.caption || image.title) && (
              <div className="p-3">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {image.caption || image.title}
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderCarousel = () => (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${(selectedIndex || 0) * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.id} className="w-full flex-shrink-0">
              <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  onLoadingComplete={() => handleImageLoad(image.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showControls && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrevious}
            className="bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleNext}
            className="bg-white/80 hover:bg-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className={cn("w-full", className)}>
      {layout === 'grid' && renderGrid()}
      {layout === 'masonry' && renderMasonry()}
      {layout === 'carousel' && renderCarousel()}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="relative w-full h-full max-w-7xl max-h-full p-4">
              {/* Close Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Navigation */}
              {showControls && images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Main Image */}
              <div 
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-full"
                >
                  <Image
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    width={images[selectedIndex].width || 800}
                    height={images[selectedIndex].height || 600}
                    className="max-w-full max-h-full object-contain"
                  />
                </motion.div>
              </div>

              {/* Image Info */}
              {(images[selectedIndex].title || images[selectedIndex].description) && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-lg">
                  {images[selectedIndex].title && (
                    <h3 className="text-lg font-semibold mb-1">
                      {images[selectedIndex].title}
                    </h3>
                  )}
                  {images[selectedIndex].description && (
                    <p className="text-sm text-neutral-300">
                      {images[selectedIndex].description}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {(enableDownload || enableShare) && (
                <div className="absolute top-4 left-4 flex space-x-2">
                  {enableDownload && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(images[selectedIndex])}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  {enableShare && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleShare(images[selectedIndex])}
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}

              {/* Thumbnails */}
              {showThumbnails && images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200",
                        index === selectedIndex
                          ? "border-coral-500 opacity-100"
                          : "border-white/30 opacity-60 hover:opacity-80"
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export type { GalleryImage, ImageGalleryProps } 