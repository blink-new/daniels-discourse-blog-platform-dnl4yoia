import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { blink } from '../blink/client'
import SEO from '../components/SEO'
import StructuredData, { BreadcrumbStructuredData } from '../components/StructuredData'
import { SidebarAd, InContentAd } from '../components/AdSense'
import { siteConfig, getFullUrl } from '../config/site'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  author_name: string
  category: string
  tags: string
  created_at: string
  published_at: string
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = useCallback(async () => {
    try {
      const posts = await blink.db.blogPosts.list({
        where: { 
          slug: slug,
          status: 'published'
        },
        limit: 1
      })
      
      if (posts.length > 0) {
        setPost(posts[0])
      } else {
        setError('Post not found')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug, fetchPost])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const parseTags = (tagsString: string) => {
    try {
      return JSON.parse(tagsString || '[]')
    } catch {
      return []
    }
  }

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\\n\\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return `<h2 class="font-heading text-2xl font-semibold mt-8 mb-4 text-foreground">${paragraph.slice(3)}</h2>`
        }
        if (paragraph.startsWith('### ')) {
          return `<h3 class="font-heading text-xl font-semibold mt-6 mb-3 text-foreground">${paragraph.slice(4)}</h3>`
        }
        if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
          return `<p class="italic text-muted-foreground text-lg leading-relaxed my-6 border-l-4 border-primary pl-6">${paragraph.slice(1, -1)}</p>`
        }
        return `<p class="text-muted-foreground leading-relaxed mb-4">${paragraph}</p>`
      })
      .join('')
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="aspect-video bg-muted rounded-lg mb-8"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={`${parseTags(post.tags).join(', ')}, ${post.category}, Daniel Simon, personal blog`}
        image={post.featured_image}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.published_at}
        author="Daniel Simon"
        section={post.category}
        tags={parseTags(post.tags)}
      />
      <StructuredData type="article" data={post} />
      <BreadcrumbStructuredData items={[
        { name: "Home", url: siteConfig.baseUrl },
        { name: "Blog", url: getFullUrl("/blog") },
        { name: post.title, url: getFullUrl(`/blog/${post.slug}`) }
      ]} />
      
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Back Button */}
              <Button variant="ghost" asChild className="mb-8">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>

              {/* Article Header */}
              <article>
                {/* Featured Image */}
                <div className="aspect-video overflow-hidden rounded-lg mb-8">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title and Meta */}
                <header className="mb-8">
                  <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {parseTags(post.tags).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Share Button */}
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </header>

                <Separator className="mb-8" />

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />

                {/* In-Content Ad */}
                <InContentAd />

                <Separator className="my-12" />

                {/* Article Footer */}
                <footer className="text-center">
                  <Card>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-heading font-bold text-white">D</span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-2">Daniel Simon</h3>
                      <p className="text-muted-foreground mb-6">
                        Writer, thinker, and explorer of life's deeper meanings. 
                        Sharing reflections on the journey we all walk together.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="outline">
                          <Link to="/about">Learn More About Daniel</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/contact">Get in Touch</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </footer>
              </article>

              {/* Related Articles CTA */}
              <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">
                  Continue Reading
                </h2>
                <p className="text-muted-foreground mb-6">
                  Explore more thoughts and reflections on life's journey.
                </p>
                <Button asChild>
                  <Link to="/blog">Browse All Articles</Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <SidebarAd />
                
                {/* Author Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-heading font-bold text-white">D</span>
                      </div>
                      <h3 className="font-heading font-semibold mb-2">Daniel Simon</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Thoughtful writer exploring life's deeper meanings
                      </p>
                      <Button asChild size="sm" variant="outline" className="w-full">
                        <Link to="/about">About Daniel</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <SidebarAd />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}