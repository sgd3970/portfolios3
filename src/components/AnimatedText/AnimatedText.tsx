'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string | string[]
  className?: string
  variant?: 'typewriter' | 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'bounce' | 'wave' | 'flip' | 'glitch' | 'gradient'
  speed?: 'slow' | 'normal' | 'fast'
  delay?: number
  duration?: number
  repeat?: boolean
  repeatDelay?: number
  splitBy?: 'character' | 'word' | 'line'
  stagger?: number
  once?: boolean
  trigger?: 'load' | 'scroll' | 'hover' | 'manual'
  preserveSpace?: boolean
  cursor?: boolean
  cursorChar?: string
  gradient?: boolean
  gradientColors?: string[]
  onComplete?: () => void
  onStart?: () => void
}

export default function AnimatedText({
  text,
  className,
  variant = 'fade-in',
  speed = 'normal',
  delay = 0,
  duration,
  repeat = false,
  repeatDelay = 2000,
  splitBy = 'character',
  stagger = 0.05,
  once = true,
  trigger = 'scroll',
  preserveSpace = true,
  cursor = false,
  cursorChar = '|',
  gradient = false,
  gradientColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  onComplete,
  onStart
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once })
  const [isVisible, setIsVisible] = useState(trigger === 'load')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(cursor)

  const textArray = Array.isArray(text) ? text : [text]
  const currentText = textArray[currentTextIndex]

  // Speed configurations
  const speedConfig = {
    slow: { duration: 1.5, stagger: 0.1 },
    normal: { duration: 1, stagger: 0.05 },
    fast: { duration: 0.5, stagger: 0.03 }
  }

  const config = speedConfig[speed]
  const animationDuration = duration || config.duration
  const animationStagger = stagger || config.stagger

  // Handle visibility trigger
  useEffect(() => {
    if (trigger === 'scroll') {
      setIsVisible(isInView)
    } else if (trigger === 'load') {
      setIsVisible(true)
    }
  }, [trigger, isInView])

  // Typewriter effect
  useEffect(() => {
    if (variant === 'typewriter' && isVisible) {
      setIsTyping(true)
      setDisplayText('')
      onStart?.()

      let index = 0
      const typeInterval = setInterval(() => {
        if (index < currentText.length) {
          setDisplayText(currentText.substring(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          onComplete?.()

          if (repeat) {
            if (textArray.length > 1) {
              setTimeout(() => {
                setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
              }, repeatDelay)
            } else {
              setTimeout(() => {
                setIsVisible(false)
                setTimeout(() => setIsVisible(true), 100)
              }, repeatDelay)
            }
          }
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [variant, isVisible, currentText, repeat, repeatDelay, onComplete, onStart, textArray.length])

  // Cursor blinking effect
  useEffect(() => {
    if (cursor && (variant === 'typewriter' || showCursor)) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [cursor, variant, showCursor])

  // Split text into parts
  const splitText = (text: string) => {
    switch (splitBy) {
      case 'character':
        return text.split('')
      case 'word':
        return text.split(' ')
      case 'line':
        return text.split('\n')
      default:
        return text.split('')
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationStagger,
        delayChildren: delay
      }
    }
  }

  const getItemVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: animationDuration }
      }
    }

    switch (variant) {
      case 'fade-in':
        return baseVariants

      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: animationDuration }
          }
        }

      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: animationDuration }
          }
        }

      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: animationDuration }
          }
        }

      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: animationDuration }
          }
        }

      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: animationDuration }
          }
        }

      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: {
            opacity: 1,
            rotate: 0,
            transition: { duration: animationDuration }
          }
        }

      case 'bounce':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: animationDuration,
              type: 'spring' as const,
              bounce: 0.4
            }
          }
        }

      case 'wave':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              duration: animationDuration,
              delay: i * 0.1,
              type: 'spring' as const,
              bounce: 0.3
            }
          })
        }

      case 'flip':
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: {
            opacity: 1,
            rotateY: 0,
            transition: { duration: animationDuration }
          }
        }

      case 'glitch':
        return {
          hidden: { opacity: 0, x: 0, y: 0 },
          visible: {
            opacity: 1,
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 0, 1, 0],
            transition: {
              duration: animationDuration,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }
          }
        }

      default:
        return baseVariants
    }
  }

  const itemVariants = getItemVariants()

  // Gradient text styles
  const gradientStyles = gradient ? {
    background: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
    backgroundSize: '400% 400%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradient 3s ease infinite'
  } : {}

  // Handle manual trigger
  const handleTrigger = () => {
    if (trigger === 'manual') {
      setIsVisible(true)
    }
  }

  // Typewriter variant
  if (variant === 'typewriter') {
    return (
      <div
        ref={containerRef}
        className={cn("inline-block", className)}
        onClick={trigger === 'manual' ? handleTrigger : undefined}
        style={gradientStyles}
      >
        <span>
          {displayText}
          {cursor && (
            <span className={cn("inline-block", showCursor ? 'opacity-100' : 'opacity-0')}>
              {cursorChar}
            </span>
          )}
        </span>
      </div>
    )
  }

  // Other variants
  return (
    <motion.div
      ref={containerRef}
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onClick={trigger === 'manual' ? handleTrigger : undefined}
      style={gradientStyles}
      onAnimationStart={onStart}
      onAnimationComplete={onComplete}
    >
      {splitText(currentText).map((part, index) => (
        <motion.span
          key={`${currentTextIndex}-${index}`}
          variants={itemVariants}
          custom={index}
          className={cn(
            "inline-block",
            splitBy === 'word' && preserveSpace && "mr-[0.25em]",
            splitBy === 'line' && "block"
          )}
        >
          {part === ' ' && preserveSpace ? '\u00A0' : part}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Preset configurations
export const AnimatedTextPresets = {
  hero: {
    variant: 'slide-up' as const,
    speed: 'normal' as const,
    stagger: 0.05,
    splitBy: 'word' as const,
    delay: 0.2
  },
  
  typewriter: {
    variant: 'typewriter' as const,
    speed: 'normal' as const,
    cursor: true,
    repeat: true,
    repeatDelay: 3000
  },
  
  fade: {
    variant: 'fade-in' as const,
    speed: 'normal' as const,
    stagger: 0.03,
    splitBy: 'character' as const
  },
  
  wave: {
    variant: 'wave' as const,
    speed: 'normal' as const,
    splitBy: 'character' as const,
    stagger: 0.1
  },
  
  glitch: {
    variant: 'glitch' as const,
    speed: 'fast' as const,
    splitBy: 'character' as const,
    stagger: 0.02
  },
  
  gradient: {
    variant: 'fade-in' as const,
    speed: 'normal' as const,
    gradient: true,
    gradientColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
  }
}

export type { AnimatedTextProps } 