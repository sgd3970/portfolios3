'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'
import Button from '../UI/Button'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  variant?: 'button' | 'switch' | 'dropdown' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showIcon?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  animated?: boolean
  customColors?: {
    light: string
    dark: string
    system: string
  }
  onThemeChange?: (theme: string) => void
}

const themeOptions = [
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
    color: '#FDB813'
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
    color: '#1E293B'
  },
  {
    value: 'system',
    label: 'System',
    icon: Monitor,
    color: '#6B7280'
  }
]

export default function ThemeToggle({
  className,
  variant = 'button',
  size = 'md',
  showLabel = false,
  showIcon = true,
  position = 'top-right',
  animated = true,
  customColors,
  onThemeChange
}: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme || 'system'
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    onThemeChange?.(newTheme)
    setIsOpen(false)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'w-8 h-8 text-sm',
          icon: 'w-4 h-4',
          text: 'text-xs'
        }
      case 'md':
        return {
          button: 'w-10 h-10 text-base',
          icon: 'w-5 h-5',
          text: 'text-sm'
        }
      case 'lg':
        return {
          button: 'w-12 h-12 text-lg',
          icon: 'w-6 h-6',
          text: 'text-base'
        }
      default:
        return {
          button: 'w-10 h-10 text-base',
          icon: 'w-5 h-5',
          text: 'text-sm'
        }
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'fixed top-4 right-4 z-50'
      case 'top-left':
        return 'fixed top-4 left-4 z-50'
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50'
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50'
      default:
        return ''
    }
  }

  const sizeClasses = getSizeClasses()
  const positionClasses = getPositionClasses()

  const getCurrentIcon = () => {
    const currentOption = themeOptions.find(option => option.value === currentTheme)
    return currentOption?.icon || Sun
  }

  const getCurrentColor = () => {
    if (customColors) {
      return customColors[currentTheme as keyof typeof customColors]
    }
    const currentOption = themeOptions.find(option => option.value === currentTheme)
    return currentOption?.color || '#FDB813'
  }

  // Button Variant
  if (variant === 'button') {
    const CurrentIcon = getCurrentIcon()
    
    return (
      <motion.div
        className={cn(positionClasses, className)}
        initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3 } : undefined}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const nextTheme = currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light'
            handleThemeChange(nextTheme)
          }}
          className={cn(
            sizeClasses.button,
            "relative bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 rounded-full"
          )}
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light'} mode`}
        >
          <motion.div
            key={currentTheme}
            initial={animated ? { rotate: -90, opacity: 0 } : undefined}
            animate={animated ? { rotate: 0, opacity: 1 } : undefined}
            transition={animated ? { duration: 0.3 } : undefined}
            className="flex items-center justify-center"
          >
            {showIcon && (
              <CurrentIcon 
                className={cn(sizeClasses.icon, "transition-colors duration-300")}
                style={{ color: getCurrentColor() }}
              />
            )}
            {showLabel && (
              <span className={cn(sizeClasses.text, "ml-2 font-medium")}>
                {themeOptions.find(option => option.value === currentTheme)?.label}
              </span>
            )}
          </motion.div>
        </Button>
      </motion.div>
    )
  }

  // Switch Variant
  if (variant === 'switch') {
    return (
      <motion.div
        className={cn(positionClasses, "flex items-center space-x-3", className)}
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.3 } : undefined}
      >
        {showLabel && (
          <span className={cn(sizeClasses.text, "font-medium text-neutral-700 dark:text-neutral-300")}>
            {resolvedTheme === 'dark' ? 'Dark' : 'Light'} Mode
          </span>
        )}
        <motion.button
          onClick={() => handleThemeChange(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className={cn(
            "relative inline-flex items-center rounded-full p-1 transition-colors duration-300",
            size === 'sm' ? 'w-12 h-6' : size === 'lg' ? 'w-16 h-8' : 'w-14 h-7',
            resolvedTheme === 'dark' 
              ? 'bg-coral-500' 
              : 'bg-neutral-300 dark:bg-neutral-600'
          )}
          aria-label="Toggle theme"
        >
          <motion.div
            className={cn(
              "inline-block rounded-full bg-white shadow-md transform transition-transform duration-300",
              size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
            )}
            animate={{
              x: resolvedTheme === 'dark' 
                ? size === 'sm' ? 24 : size === 'lg' ? 32 : 28
                : 2
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              key={resolvedTheme}
              initial={animated ? { rotate: -180, opacity: 0 } : undefined}
              animate={animated ? { rotate: 0, opacity: 1 } : undefined}
              transition={animated ? { duration: 0.3 } : undefined}
            >
              {showIcon && (
                <>
                  {resolvedTheme === 'dark' ? (
                    <Moon className={cn(size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3', "text-coral-500")} />
                  ) : (
                    <Sun className={cn(size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3', "text-yellow-500")} />
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.button>
      </motion.div>
    )
  }

  // Dropdown Variant
  if (variant === 'dropdown') {
    return (
      <motion.div
        className={cn(positionClasses, "relative", className)}
        initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
        animate={animated ? { opacity: 1, scale: 1 } : undefined}
        transition={animated ? { duration: 0.3 } : undefined}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            sizeClasses.button,
            "relative bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 rounded-full"
          )}
          aria-label="Theme selector"
        >
          <motion.div
            className="flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Palette className={cn(sizeClasses.icon, "text-neutral-700 dark:text-neutral-300")} />
          </motion.div>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-1 min-w-[120px]"
            >
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isSelected = currentTheme === option.value
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full flex items-center space-x-2 px-3 py-2 rounded-md text-left transition-all duration-200",
                      isSelected
                        ? "bg-coral-500 text-white"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    )}
                  >
                    <Icon 
                      className={cn(sizeClasses.icon)}
                      style={{ color: isSelected ? 'white' : option.color }}
                    />
                    <span className={sizeClasses.text}>{option.label}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // Floating Variant
  if (variant === 'floating') {
    return (
      <motion.div
        className={cn(positionClasses, "flex flex-col space-y-2", className)}
        initial={animated ? { opacity: 0, x: 20 } : undefined}
        animate={animated ? { opacity: 1, x: 0 } : undefined}
        transition={animated ? { duration: 0.3 } : undefined}
      >
        {themeOptions.map((option, index) => {
          const Icon = option.icon
          const isSelected = currentTheme === option.value
          
          return (
            <motion.button
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              initial={animated ? { opacity: 0, x: 20 } : undefined}
              animate={animated ? { opacity: 1, x: 0 } : undefined}
              transition={animated ? { duration: 0.3, delay: index * 0.1 } : undefined}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                sizeClasses.button,
                "relative rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300",
                isSelected
                  ? "bg-coral-500 border-coral-500 text-white shadow-coral-500/25"
                  : "bg-white/10 dark:bg-black/10 border-neutral-200 dark:border-neutral-800 hover:bg-white/20 dark:hover:bg-black/20"
              )}
              aria-label={`Switch to ${option.label} mode`}
            >
              <Icon 
                className={cn(sizeClasses.icon, "transition-colors duration-300")}
                style={{ color: isSelected ? 'white' : option.color }}
              />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {option.label}
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    )
  }

  return null
}

export type { ThemeToggleProps } 