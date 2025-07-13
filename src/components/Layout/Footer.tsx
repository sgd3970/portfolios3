'use client'

import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react'
import Link from 'next/link'
import Button from '../UI/Button'
import { cn } from '@/lib/utils'

interface SocialLink {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com',
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    color: 'hover:text-black dark:hover:text-white'
  },
  {
    href: 'https://linkedin.com',
    icon: <Linkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    color: 'hover:text-blue-600'
  },
  {
    href: 'https://twitter.com',
    icon: <Twitter className="w-5 h-5" />,
    label: 'Twitter',
    color: 'hover:text-blue-400'
  },
  {
    href: 'https://instagram.com',
    icon: <Instagram className="w-5 h-5" />,
    label: 'Instagram',
    color: 'hover:text-pink-500'
  },
  {
    href: 'https://dribbble.com',
    icon: <Dribbble className="w-5 h-5" />,
    label: 'Dribbble',
    color: 'hover:text-coral-500'
  }
]

const quickLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

const services = [
  'UI/UX Design',
  'Web Development',
  'Mobile App Design',
  'Brand Identity',
  'Graphic Design'
]

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const handleScrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className={cn("bg-neutral-900 dark:bg-black text-white", className)}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-coral-500 to-mint-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold">Portfolio</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm leading-relaxed"
            >
              Creative designer and developer passionate about crafting beautiful, functional digital experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-3"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-full bg-neutral-800 dark:bg-neutral-900 text-neutral-400 transition-all duration-200",
                    link.color
                  )}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold"
            >
              Quick Links
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleScrollToSection(link.href)}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold"
            >
              Services
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {services.map((service) => (
                <li key={service}>
                  <span className="text-neutral-400 text-sm">{service}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-semibold"
            >
              Contact
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-coral-500" />
                <a
                  href="mailto:hello@portfolio.com"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  hello@portfolio.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-coral-500" />
                <a
                  href="tel:+1234567890"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-coral-500" />
                <span className="text-neutral-400 text-sm">
                  Seoul, South Korea
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScrollToSection('#contact')}
                className="border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white"
              >
                Get In Touch
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 dark:border-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm text-center md:text-left"
            >
              © {currentYear} Portfolio. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-1 text-neutral-400 text-sm"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 text-coral-500 fill-current" />
              <span>by Creative Designer</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
} 