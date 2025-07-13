'use client'

import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube, 
  Dribbble, 
  Behance,
  Mail,
  Phone,
  MessageCircle,
  Globe,
  ExternalLink
} from 'lucide-react'
import { Button } from '../UI/Button'
import { cn } from '@/lib/utils'

interface SocialLink {
  platform: string
  url: string
  username?: string
  icon?: React.ReactNode
  color?: string
  label?: string
  isExternal?: boolean
}

interface SocialLinksProps {
  links: SocialLink[]
  className?: string
  variant?: 'default' | 'minimal' | 'filled' | 'outlined' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'tight' | 'normal' | 'loose'
  showLabels?: boolean
  showTooltips?: boolean
  animated?: boolean
  hoverEffect?: 'scale' | 'bounce' | 'rotate' | 'glow' | 'slide'
  iconOnly?: boolean
  rounded?: boolean
  onLinkClick?: (link: SocialLink) => void
}

// Predefined social platform configurations
const socialPlatforms = {
  github: {
    icon: <Github className="w-full h-full" />,
    color: '#333333',
    label: 'GitHub'
  },
  linkedin: {
    icon: <Linkedin className="w-full h-full" />,
    color: '#0077B5',
    label: 'LinkedIn'
  },
  twitter: {
    icon: <Twitter className="w-full h-full" />,
    color: '#1DA1F2',
    label: 'Twitter'
  },
  instagram: {
    icon: <Instagram className="w-full h-full" />,
    color: '#E4405F',
    label: 'Instagram'
  },
  facebook: {
    icon: <Facebook className="w-full h-full" />,
    color: '#1877F2',
    label: 'Facebook'
  },
  youtube: {
    icon: <Youtube className="w-full h-full" />,
    color: '#FF0000',
    label: 'YouTube'
  },
  dribbble: {
    icon: <Dribbble className="w-full h-full" />,
    color: '#EA4C89',
    label: 'Dribbble'
  },
  behance: {
    icon: <Behance className="w-full h-full" />,
    color: '#1769FF',
    label: 'Behance'
  },
  email: {
    icon: <Mail className="w-full h-full" />,
    color: '#EA4335',
    label: 'Email'
  },
  phone: {
    icon: <Phone className="w-full h-full" />,
    color: '#25D366',
    label: 'Phone'
  },
  whatsapp: {
    icon: <MessageCircle className="w-full h-full" />,
    color: '#25D366',
    label: 'WhatsApp'
  },
  website: {
    icon: <Globe className="w-full h-full" />,
    color: '#6B7280',
    label: 'Website'
  }
}

export default function SocialLinks({
  links,
  className,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  spacing = 'normal',
  showLabels = false,
  showTooltips = true,
  animated = true,
  hoverEffect = 'scale',
  iconOnly = false,
  rounded = true,
  onLinkClick
}: SocialLinksProps) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'gap-2',
          button: 'w-8 h-8 text-sm',
          icon: 'w-4 h-4'
        }
      case 'md':
        return {
          container: 'gap-3',
          button: 'w-10 h-10 text-base',
          icon: 'w-5 h-5'
        }
      case 'lg':
        return {
          container: 'gap-4',
          button: 'w-12 h-12 text-lg',
          icon: 'w-6 h-6'
        }
      default:
        return {
          container: 'gap-3',
          button: 'w-10 h-10 text-base',
          icon: 'w-5 h-5'
        }
    }
  }

  const getSpacingClasses = () => {
    switch (spacing) {
      case 'tight':
        return orientation === 'horizontal' ? 'gap-1' : 'gap-1'
      case 'normal':
        return orientation === 'horizontal' ? 'gap-3' : 'gap-2'
      case 'loose':
        return orientation === 'horizontal' ? 'gap-6' : 'gap-4'
      default:
        return orientation === 'horizontal' ? 'gap-3' : 'gap-2'
    }
  }

  const getVariantClasses = (platform: string) => {
    const platformConfig = socialPlatforms[platform.toLowerCase() as keyof typeof socialPlatforms]
    const baseClasses = "transition-all duration-200 group"
    
    switch (variant) {
      case 'minimal':
        return cn(
          baseClasses,
          "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white",
          "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )
      case 'filled':
        return cn(
          baseClasses,
          "text-white",
          `bg-[${platformConfig?.color || '#6B7280'}] hover:opacity-80`
        )
      case 'outlined':
        return cn(
          baseClasses,
          "text-neutral-600 dark:text-neutral-400 hover:text-white",
          "border-2 border-neutral-300 dark:border-neutral-600",
          `hover:bg-[${platformConfig?.color || '#6B7280'}] hover:border-[${platformConfig?.color || '#6B7280'}]`
        )
      case 'floating':
        return cn(
          baseClasses,
          "text-neutral-600 dark:text-neutral-400 hover:text-white",
          "bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl",
          `hover:bg-[${platformConfig?.color || '#6B7280'}]`
        )
      default:
        return cn(
          baseClasses,
          "text-neutral-600 dark:text-neutral-400",
          "hover:text-white bg-neutral-100 dark:bg-neutral-800",
          `hover:bg-[${platformConfig?.color || '#6B7280'}]`
        )
    }
  }

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'scale':
        return {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.95 }
        }
      case 'bounce':
        return {
          whileHover: { y: -2 },
          whileTap: { y: 0 }
        }
      case 'rotate':
        return {
          whileHover: { rotate: 5 },
          whileTap: { rotate: 0 }
        }
      case 'glow':
        return {
          whileHover: { boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)' },
          whileTap: { scale: 0.95 }
        }
      case 'slide':
        return {
          whileHover: { x: 2 },
          whileTap: { x: 0 }
        }
      default:
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 }
        }
    }
  }

  const handleLinkClick = (link: SocialLink) => {
    onLinkClick?.(link)
    
    if (link.platform === 'email') {
      window.location.href = `mailto:${link.url}`
    } else if (link.platform === 'phone') {
      window.location.href = `tel:${link.url}`
    } else if (link.isExternal !== false) {
      window.open(link.url, '_blank', 'noopener,noreferrer')
    }
  }

  const renderIcon = (link: SocialLink) => {
    const platformConfig = socialPlatforms[link.platform.toLowerCase() as keyof typeof socialPlatforms]
    const icon = link.icon || platformConfig?.icon || <ExternalLink className="w-full h-full" />
    
    return (
      <span className={getSizeClasses().icon}>
        {icon}
      </span>
    )
  }

  const renderLabel = (link: SocialLink) => {
    if (!showLabels && !(!iconOnly && !showLabels)) return null
    
    const platformConfig = socialPlatforms[link.platform.toLowerCase() as keyof typeof socialPlatforms]
    const label = link.label || platformConfig?.label || link.platform
    
    return (
      <span className="text-sm font-medium">
        {link.username ? `@${link.username}` : label}
      </span>
    )
  }

  const containerClasses = cn(
    "flex items-center",
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    getSpacingClasses(),
    className
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      className={containerClasses}
      variants={animated ? containerVariants : undefined}
      initial={animated ? "hidden" : undefined}
      whileInView={animated ? "visible" : undefined}
      viewport={{ once: true }}
    >
      {links.map((link, index) => {
        const platformConfig = socialPlatforms[link.platform.toLowerCase() as keyof typeof socialPlatforms]
        const hoverAnimation = getHoverAnimation()
        
        return (
          <motion.div
            key={`${link.platform}-${index}`}
            variants={animated ? itemVariants : undefined}
            {...(animated ? hoverAnimation : {})}
            className="relative group"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLinkClick(link)}
              className={cn(
                getSizeClasses().button,
                getVariantClasses(link.platform),
                rounded ? 'rounded-full' : 'rounded-md',
                "relative overflow-hidden"
              )}
              aria-label={link.label || platformConfig?.label || link.platform}
            >
              {/* Background effect */}
              {variant === 'filled' && (
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: link.color || platformConfig?.color || '#6B7280' }}
                />
              )}
              
              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center">
                {renderIcon(link)}
              </div>
              
              {/* Label */}
              {!iconOnly && (
                <div className="relative z-10 ml-2">
                  {renderLabel(link)}
                </div>
              )}
            </Button>

            {/* Tooltip */}
            {showTooltips && iconOnly && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                {link.label || platformConfig?.label || link.platform}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// Utility function to create social links
export const createSocialLinks = (links: { [key: string]: string | { url: string; username?: string } }): SocialLink[] => {
  return Object.entries(links).map(([platform, value]) => {
    const config = typeof value === 'string' ? { url: value } : value
    return {
      platform,
      ...config
    }
  })
}

// Common social link presets
export const socialLinkPresets = {
  designer: [
    { platform: 'dribbble', url: 'https://dribbble.com/username' },
    { platform: 'behance', url: 'https://behance.net/username' },
    { platform: 'instagram', url: 'https://instagram.com/username' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/username' }
  ],
  developer: [
    { platform: 'github', url: 'https://github.com/username' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/username' },
    { platform: 'twitter', url: 'https://twitter.com/username' },
    { platform: 'website', url: 'https://yourwebsite.com' }
  ],
  content: [
    { platform: 'youtube', url: 'https://youtube.com/channel/username' },
    { platform: 'instagram', url: 'https://instagram.com/username' },
    { platform: 'twitter', url: 'https://twitter.com/username' },
    { platform: 'facebook', url: 'https://facebook.com/username' }
  ],
  contact: [
    { platform: 'email', url: 'hello@example.com' },
    { platform: 'phone', url: '+1234567890' },
    { platform: 'whatsapp', url: 'https://wa.me/1234567890' },
    { platform: 'website', url: 'https://example.com' }
  ]
}

export type { SocialLink, SocialLinksProps } 