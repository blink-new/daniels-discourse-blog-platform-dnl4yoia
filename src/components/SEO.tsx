import { Helmet } from 'react-helmet-async'
import { siteConfig, getFullUrl } from '../config/site'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function SEO({
  title = `${siteConfig.name} - Thoughtful Personal Blog`,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  image = "/og-image.jpg",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  author = siteConfig.author,
  section,
  tags
}: SEOProps) {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
  const fullUrl = url.startsWith('http') ? url : getFullUrl(url)
  const fullImage = image.startsWith('http') ? image : getFullUrl(image)

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content={siteConfig.twitter} />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? "BlogPosting" : "WebSite",
          "name": fullTitle,
          "description": description,
          "url": fullUrl,
          "image": fullImage,
          "author": {
            "@type": "Person",
            "name": author,
            "url": getFullUrl("/about")
          },
          "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": getFullUrl("/logo.png")
            }
          },
          ...(type === 'article' && publishedTime && {
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": fullUrl
            }
          })
        })}
      </script>

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#6B5B73" />
      <meta name="msapplication-TileColor" content="#6B5B73" />
      
      {/* Performance and loading optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      
      {/* Breadcrumb structured data for navigation */}
      {url !== '' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteConfig.baseUrl
              },
              ...(url.includes('/blog/') ? [
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": getFullUrl("/blog")
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": title.replace(` | ${siteConfig.name}`, ""),
                  "item": fullUrl
                }
              ] : [
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": title.replace(` | ${siteConfig.name}`, ""),
                  "item": fullUrl
                }
              ])
            ]
          })}
        </script>
      )}
    </Helmet>
  )
}