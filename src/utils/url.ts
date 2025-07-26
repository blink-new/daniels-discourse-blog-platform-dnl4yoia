import { siteConfig } from '../config/site'

/**
 * URL utilities for Daniel's Discourse blog
 * These functions help manage URLs consistently across the application
 */

// Get the current domain without protocol
export const getCurrentDomain = (): string => {
  return siteConfig.baseUrl.replace(/^https?:\/\//, '')
}

// Get a clean display URL for sharing
export const getDisplayUrl = (path: string = ''): string => {
  const domain = getCurrentDomain()
  return path ? `${domain}${path}` : domain
}

// Get full URL for SEO and sharing
export const getFullUrl = (path: string = ''): string => {
  return `${siteConfig.baseUrl}${path}`
}

// Get admin URL
export const getAdminUrl = (): string => {
  return getFullUrl(siteConfig.adminPath)
}

// Check if URL is internal
export const isInternalUrl = (url: string): boolean => {
  return url.startsWith('/') || url.includes(getCurrentDomain())
}

// Get blog post URL
export const getBlogPostUrl = (slug: string): string => {
  return getFullUrl(`/blog/${slug}`)
}

// Get category URL
export const getCategoryUrl = (category: string): string => {
  return getFullUrl(`/categories?category=${encodeURIComponent(category)}`)
}

// Get search URL
export const getSearchUrl = (query: string): string => {
  return getFullUrl(`/blog?search=${encodeURIComponent(query)}`)
}

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Clean URL for display (remove protocol, www, trailing slash)
export const cleanUrlForDisplay = (url: string): string => {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
}

// Generate social sharing URLs
export const getSocialShareUrls = (title: string, url: string, description?: string) => {
  const fullUrl = url.startsWith('http') ? url : getFullUrl(url)
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    copy: fullUrl
  }
}

// Future: Custom domain support
export const updateBaseUrl = (newBaseUrl: string): void => {
  // This function would be used when implementing custom domain support
  // For now, it's a placeholder for future functionality
  console.log(`Future feature: Update base URL to ${newBaseUrl}`)
}