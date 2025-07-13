'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
  className?: string
  headerClassName?: string
  footerClassName?: string
  showHeader?: boolean
  showFooter?: boolean
}

export default function Layout({ 
  children, 
  className,
  headerClassName,
  footerClassName,
  showHeader = true,
  showFooter = true
}: LayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {/* Header */}
      {showHeader && <Header className={headerClassName} />}
      
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {/* Footer */}
      {showFooter && <Footer className={footerClassName} />}
    </div>
  )
} 