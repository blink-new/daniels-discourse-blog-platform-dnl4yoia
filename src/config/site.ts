// Site configuration for URLs and metadata
export const siteConfig = {
  // Base URL - will be updated when custom domain is available
  baseUrl: 'https://daniels-discourse-blog-platform-dnl4yoia.sites.blink.new',
  
  // Site metadata
  name: "Daniel's Discourse",
  description: "A personal blog focused on introspection and writing about life experiences. Join Daniel as he shares thoughtful reflections on life, growth, and the human experience.",
  author: "Daniel Simon",
  email: "danielsimon.dika@gmail.com",
  
  // Social media
  twitter: "@danielsdiscourse",
  
  // SEO defaults
  keywords: "personal blog, introspection, life experiences, thoughtful writing, personal growth, reflection, philosophy, life lessons",
  
  // Admin settings
  adminPath: "/admin",
  
  // Navigation
  nav: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" }
  ]
}

// Helper function to get full URL
export const getFullUrl = (path: string = '') => {
  return `${siteConfig.baseUrl}${path}`
}

// Helper function to get clean URLs for display
export const getDisplayUrl = () => {
  // Remove protocol and www for display
  return siteConfig.baseUrl
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
}