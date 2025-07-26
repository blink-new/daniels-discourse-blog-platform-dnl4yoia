import { Helmet } from 'react-helmet-async'
import { siteConfig, getFullUrl } from '../config/site'

interface StructuredDataProps {
  type: 'website' | 'blog' | 'article' | 'person' | 'organization'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteConfig.name,
          "description": siteConfig.description,
          "url": siteConfig.baseUrl,
          "author": {
            "@type": "Person",
            "name": siteConfig.author,
            "email": siteConfig.email,
            "url": getFullUrl("/about")
          },
          "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": getFullUrl("/logo.png"),
              "width": 200,
              "height": 60
            }
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${siteConfig.baseUrl}/blog?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://twitter.com/danielsdiscourse",
            "https://linkedin.com/in/danielsimon"
          ]
        }

      case 'blog':
        return {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": `${siteConfig.name} Blog`,
          "description": "Thoughtful reflections on life, growth, and the human experience",
          "url": getFullUrl("/blog"),
          "author": {
            "@type": "Person",
            "name": siteConfig.author,
            "email": siteConfig.email,
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
          "blogPost": data.posts?.map((post: any) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": getFullUrl(`/blog/${post.slug}`),
            "datePublished": post.published_at,
            "dateModified": post.updated_at,
            "author": {
              "@type": "Person",
              "name": siteConfig.author
            },
            "image": post.featured_image
          })) || []
        }

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": data.title,
          "description": data.excerpt,
          "image": {
            "@type": "ImageObject",
            "url": data.featured_image,
            "width": 800,
            "height": 400
          },
          "url": getFullUrl(`/blog/${data.slug}`),
          "datePublished": data.published_at,
          "dateModified": data.updated_at || data.published_at,
          "author": {
            "@type": "Person",
            "name": data.author_name || siteConfig.author,
            "email": siteConfig.email,
            "url": getFullUrl("/about")
          },
          "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": getFullUrl("/logo.png"),
              "width": 200,
              "height": 60
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": getFullUrl(`/blog/${data.slug}`)
          },
          "articleSection": data.category,
          "keywords": data.tags ? (Array.isArray(data.tags) ? data.tags.join(', ') : data.tags) : '',
          "wordCount": data.content ? data.content.split(' ').length : 0,
          "commentCount": data.commentCount || 0,
          "inLanguage": "en-US",
          "copyrightYear": new Date(data.published_at).getFullYear(),
          "copyrightHolder": {
            "@type": "Person",
            "name": siteConfig.author
          }
        }

      case 'person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": siteConfig.author,
          "email": siteConfig.email,
          "url": getFullUrl("/about"),
          "image": data.image || getFullUrl("/daniel-avatar.jpg"),
          "jobTitle": "Writer & Blogger",
          "description": data.bio || "Writer, thinker, and explorer of life's deeper meanings. Sharing reflections on the journey we all walk together.",
          "knowsAbout": [
            "Personal Development",
            "Philosophy",
            "Life Experiences",
            "Introspection",
            "Writing",
            "Mindfulness"
          ],
          "sameAs": [
            "https://twitter.com/danielsdiscourse",
            "https://linkedin.com/in/danielsimon"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.baseUrl
          }
        }

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": getFullUrl("/logo.png"),
            "width": 200,
            "height": 60
          },
          "description": "A personal blog platform focused on introspective writing and life experiences",
          "founder": {
            "@type": "Person",
            "name": siteConfig.author,
            "email": siteConfig.email
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": siteConfig.email,
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://twitter.com/danielsdiscourse",
            "https://linkedin.com/in/danielsimon"
          ]
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

// Helper component for FAQ structured data
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

// Helper component for breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}