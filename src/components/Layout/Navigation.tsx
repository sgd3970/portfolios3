'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
  isActive?: boolean
  isExternal?: boolean
}

interface NavigationProps {
  items: NavItem[]
  className?: string
  itemClassName?: string
  activeItemClassName?: string
  orientation?: 'horizontal' | 'vertical'
  variant?: 'primary' | 'secondary' | 'minimal'
  showActiveIndicator?: boolean
  onItemClick?: (item: NavItem) => void
}

export default function Navigation({
  items,
  className,
  itemClassName,
  activeItemClassName,
  orientation = 'horizontal',
  variant = 'primary',
  showActiveIndicator = true,
  onItemClick
}: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleItemClick = (item: NavItem) => {
    if (onItemClick) {
      onItemClick(item)
    }
    
    if (item.href.startsWith('#')) {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          nav: "bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-2",
          item: "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800",
          active: "bg-coral-500 text-white hover:bg-coral-600"
        }
      case 'secondary':
        return {
          nav: "bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1",
          item: "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white dark:hover:bg-neutral-700",
          active: "bg-white dark:bg-neutral-600 text-coral-500 shadow-sm"
        }
      case 'minimal':
        return {
          nav: "",
          item: "px-2 py-1 text-sm font-medium transition-all duration-200 hover:text-coral-500",
          active: "text-coral-500"
        }
      default:
        return {
          nav: "",
          item: "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800",
          active: "bg-coral-500 text-white"
        }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <nav
      className={cn(
        variantStyles.nav,
        orientation === 'vertical' ? 'flex flex-col space-y-1' : 'flex items-center space-x-1',
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.isActive
        const isHovered = hoveredItem === item.href

        return (
          <motion.div
            key={item.href}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.href)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.isExternal ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  variantStyles.item,
                  isActive && cn(variantStyles.active, activeItemClassName),
                  !isActive && "text-neutral-700 dark:text-neutral-300",
                  itemClassName
                )}
              >
                <span className="flex items-center space-x-2">
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              </a>
            ) : item.href.startsWith('#') ? (
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  variantStyles.item,
                  isActive && cn(variantStyles.active, activeItemClassName),
                  !isActive && "text-neutral-700 dark:text-neutral-300",
                  itemClassName
                )}
              >
                <span className="flex items-center space-x-2">
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  variantStyles.item,
                  isActive && cn(variantStyles.active, activeItemClassName),
                  !isActive && "text-neutral-700 dark:text-neutral-300",
                  itemClassName
                )}
              >
                <span className="flex items-center space-x-2">
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              </Link>
            )}

            {/* Active Indicator */}
            {showActiveIndicator && isActive && variant === 'minimal' && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-coral-500 rounded-full"
              />
            )}

            {/* Hover Indicator */}
            {showActiveIndicator && isHovered && !isActive && variant === 'minimal' && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-coral-300 rounded-full"
              />
            )}
          </motion.div>
        )
      })}
    </nav>
  )
}

// Export types for use in other components
export type { NavItem, NavigationProps } 