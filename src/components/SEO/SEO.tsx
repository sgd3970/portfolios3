'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile' | 'music' | 'video'
  siteName?: string
  url?: string
  locale?: string
  alternateLocales?: string[]
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  canonical?: string
  robots?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string
  fbAppId?: string
  structuredData?: any
  additionalMetaTags?: { name?: string; property?: string; content: string }[]
  additionalLinkTags?: { rel: string; href: string; [key: string]: string }[]
}

const defaultConfig = {
  siteName: 'Creative Portfolio',
  description: 'A creative portfolio showcasing innovative design and development projects',
  author: 'Creative Designer',
  image: '/images/og-image.jpg',
  imageAlt: 'Creative Portfolio',
  type: 'website' as const,
  locale: 'en_US',
  twitterCard: 'summary_large_image' as const,
  robots: 'index, follow'
}

export default function SEO({
  title,
  description = defaultConfig.description,
  keywords = [],
  author = defaultConfig.author,
  image = defaultConfig.image,
  imageAlt = defaultConfig.imageAlt,
  type = defaultConfig.type,
  siteName = defaultConfig.siteName,
  url,
  locale = defaultConfig.locale,
  alternateLocales = [],
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  canonical,
  robots = defaultConfig.robots,
  twitterCard = defaultConfig.twitterCard,
  twitterSite,
  twitterCreator,
  fbAppId,
  structuredData,
  additionalMetaTags = [],
  additionalLinkTags = []
}: SEOProps) {
  const pathname = usePathname()
  
  // Generate the full URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio.com'
  const fullUrl = url || `${baseUrl}${pathname}`
  const fullImageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`
  
  // Generate page title
  const pageTitle = title ? `${title} | ${siteName}` : siteName
  
  // Generate keywords string
  const keywordsString = keywords.join(', ')
  
  // Generate structured data
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'profile' ? 'Person' : 'WebSite',
    name: siteName,
    description,
    url: fullUrl,
    ...(type === 'profile' && {
      '@type': 'Person',
      name: author,
      jobTitle: 'Creative Designer & Developer',
      image: fullImageUrl,
      url: fullUrl,
      sameAs: [
        'https://github.com/username',
        'https://linkedin.com/in/username',
        'https://twitter.com/username'
      ]
    }),
    ...(type === 'website' && {
      '@type': 'WebSite',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${fullUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    })
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || fullUrl} />
      
      {/* Language and Locale */}
      <html lang={locale.split('_')[0]} />
      {alternateLocales.map(altLocale => (
        <link
          key={altLocale}
          rel="alternate"
          hrefLang={altLocale}
          href={`${baseUrl}/${altLocale}${pathname}`}
        />
      ))}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Facebook App ID */}
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta
          key={index}
          {...(tag.name && { name: tag.name })}
          {...(tag.property && { property: tag.property })}
          content={tag.content}
        />
      ))}
      
      {/* Additional Link Tags */}
      {additionalLinkTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#FF6B6B" />
      <meta name="msapplication-TileColor" content="#FF6B6B" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://picsum.photos" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://picsum.photos" />
    </Head>
  )
}

// Utility function to generate Open Graph image
export const generateOGImage = (
  title: string,
  description?: string,
  image?: string
): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio.com'
  const params = new URLSearchParams({
    title,
    ...(description && { description }),
    ...(image && { image })
  })
  
  return `${baseUrl}/api/og?${params.toString()}`
}

// Utility function to generate structured data for different content types
export const generateStructuredData = {
  website: (data: {
    name: string
    description: string
    url: string
    author: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    description: data.description,
    url: data.url,
    author: {
      '@type': 'Person',
      name: data.author
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${data.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }),
  
  person: (data: {
    name: string
    jobTitle: string
    description: string
    image: string
    url: string
    sameAs: string[]
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    image: data.image,
    url: data.url,
    sameAs: data.sameAs
  }),
  
  creativeWork: (data: {
    name: string
    description: string
    image: string
    url: string
    author: string
    dateCreated: string
    genre: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    author: {
      '@type': 'Person',
      name: data.author
    },
    dateCreated: data.dateCreated,
    genre: data.genre
  }),
  
  article: (data: {
    headline: string
    description: string
    image: string
    url: string
    author: string
    datePublished: string
    dateModified?: string
    wordCount?: number
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image,
    url: data.url,
    author: {
      '@type': 'Person',
      name: data.author
    },
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    ...(data.wordCount && { wordCount: data.wordCount })
  })
}

// SEO presets for different page types
export const SEOPresets = {
  homepage: {
    title: 'Creative Portfolio',
    description: 'A creative portfolio showcasing innovative design and development projects',
    keywords: ['portfolio', 'design', 'development', 'creative', 'ui/ux', 'web design'],
    type: 'website' as const
  },
  
  about: {
    title: 'About Me',
    description: 'Learn about my background, skills, and passion for creative design and development',
    keywords: ['about', 'biography', 'skills', 'experience', 'designer', 'developer'],
    type: 'profile' as const
  },
  
  projects: {
    title: 'Projects',
    description: 'Explore my latest creative projects and case studies',
    keywords: ['projects', 'portfolio', 'work', 'case studies', 'design', 'development'],
    type: 'website' as const
  },
  
  contact: {
    title: 'Contact',
    description: 'Get in touch for collaborations, projects, or just to say hello',
    keywords: ['contact', 'collaboration', 'hire', 'freelance', 'projects'],
    type: 'website' as const
  }
}

export type { SEOProps } 