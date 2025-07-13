'use client'

import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  screenWidth: number
  screenHeight: number
  orientation: 'portrait' | 'landscape'
  deviceType: 'mobile' | 'tablet' | 'desktop'
  userAgent: string
  isIOS: boolean
  isAndroid: boolean
  isWindowsPhone: boolean
  browser: string
  viewport: {
    width: number
    height: number
  }
}

export const useDevice = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    screenWidth: 1920,
    screenHeight: 1080,
    orientation: 'landscape',
    deviceType: 'desktop',
    userAgent: '',
    isIOS: false,
    isAndroid: false,
    isWindowsPhone: false,
    browser: '',
    viewport: {
      width: 1920,
      height: 1080
    }
  })

  useEffect(() => {
    const updateDeviceInfo = () => {
      if (typeof window === 'undefined') return

      const userAgent = navigator.userAgent
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Device detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || viewportWidth < 768
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent) || (viewportWidth >= 768 && viewportWidth < 1024)
      const isDesktop = !isMobile && !isTablet
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // OS detection
      const isIOS = /iPad|iPhone|iPod/.test(userAgent)
      const isAndroid = /Android/.test(userAgent)
      const isWindowsPhone = /Windows Phone/.test(userAgent)
      
      // Browser detection
      let browser = 'unknown'
      if (userAgent.includes('Chrome')) browser = 'chrome'
      else if (userAgent.includes('Firefox')) browser = 'firefox'
      else if (userAgent.includes('Safari')) browser = 'safari'
      else if (userAgent.includes('Edge')) browser = 'edge'
      else if (userAgent.includes('Opera')) browser = 'opera'
      
      // Orientation
      const orientation = viewportWidth > viewportHeight ? 'landscape' : 'portrait'
      
      // Device type
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
      if (isMobile) deviceType = 'mobile'
      else if (isTablet) deviceType = 'tablet'
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        screenWidth,
        screenHeight,
        orientation,
        deviceType,
        userAgent,
        isIOS,
        isAndroid,
        isWindowsPhone,
        browser,
        viewport: {
          width: viewportWidth,
          height: viewportHeight
        }
      })
    }

    updateDeviceInfo()

    const handleResize = () => {
      updateDeviceInfo()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return deviceInfo
}

// Hook for responsive values
export const useResponsiveValue = <T>(values: {
  mobile: T
  tablet?: T
  desktop: T
}): T => {
  const { isMobile, isTablet } = useDevice()
  
  if (isMobile) return values.mobile
  if (isTablet && values.tablet) return values.tablet
  return values.desktop
}

// Hook for breakpoint detection
export const useBreakpoint = (breakpoint: number): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const updateMatches = () => {
      setMatches(window.innerWidth >= breakpoint)
    }

    updateMatches()

    const handleResize = () => {
      updateMatches()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return matches
}

// Hook for viewport tracking
export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: 1920,
    height: 1080
  })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateViewport()

    const handleResize = () => {
      updateViewport()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewport
}

// Hook for network information
export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState({
    isOnline: true,
    connection: 'unknown',
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false
  })

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      
      setNetworkInfo({
        isOnline: navigator.onLine,
        connection: connection?.type || 'unknown',
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false
      })
    }

    updateNetworkInfo()

    const handleOnline = () => updateNetworkInfo()
    const handleOffline = () => updateNetworkInfo()

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return networkInfo
}

// Device-specific utilities
export const deviceUtils = {
  // Check if device supports hover
  supportsHover: () => {
    return window.matchMedia('(hover: hover)').matches
  },
  
  // Check if device is in dark mode
  prefersDarkMode: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  },
  
  // Check if device prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  // Get device pixel ratio
  getDevicePixelRatio: () => {
    return window.devicePixelRatio || 1
  },
  
  // Check if device is in standalone mode (PWA)
  isStandalone: () => {
    return window.matchMedia('(display-mode: standalone)').matches
  },
  
  // Vibrate (mobile only)
  vibrate: (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  },
  
  // Get battery info (if available)
  getBatteryInfo: async () => {
    if ('getBattery' in navigator) {
      const battery = await (navigator as any).getBattery()
      return {
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level
      }
    }
    return null
  }
}

// Tailwind breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

// Responsive hooks for each breakpoint
export const useSmUp = () => useBreakpoint(breakpoints.sm)
export const useMdUp = () => useBreakpoint(breakpoints.md)
export const useLgUp = () => useBreakpoint(breakpoints.lg)
export const useXlUp = () => useBreakpoint(breakpoints.xl)
export const use2XlUp = () => useBreakpoint(breakpoints['2xl'])

export type { DeviceInfo } 