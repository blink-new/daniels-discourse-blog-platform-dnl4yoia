import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useToast } from '../hooks/use-toast'
import { blink } from '../blink/client'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { SidebarAd } from '../components/AdSense'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  author_name: string
  category: string
  tags: string
  created_at: string
  published_at: string
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  const { toast } = useToast()

  const fetchFeaturedPosts = async () => {
    try {
      const posts = await blink.db.blogPosts.list({
        where: { status: 'published' },
        orderBy: { published_at: 'desc' },
        limit: 3
      })
      setFeaturedPosts(posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeaturedPosts()
  }, [])

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubscribing(true)
    try {
      await blink.db.newsletterSubscribers.create({
        id: `sub_${Date.now()}`,
        email,
        subscribedAt: new Date().toISOString()
      })
      
      toast({
        title: "Welcome to the community!",
        description: "You've successfully subscribed to our newsletter.",
      })
      setEmail('')
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message.includes('UNIQUE constraint') 
          ? "You're already subscribed to our newsletter."
          : "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubscribing(false)
    }
  }

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

  return (
    <>
      <SEO
        title="Daniel's Discourse - Thoughtful Personal Blog"
        description="A personal blog focused on introspection and writing about life experiences. Join Daniel as he shares thoughtful reflections on life, growth, and the human experience."
        keywords="personal blog, introspection, life experiences, thoughtful writing, personal growth, reflection, philosophy, life lessons, Daniel Simon"
        url="/"
      />
      <StructuredData type="website" data={{}} />
      <StructuredData type="person" data={{ 
        bio: "Writer, thinker, and explorer of life's deeper meanings. Sharing reflections on the journey we all walk together.",
        image: "/daniel-avatar.jpg"
      }} />
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Welcome to{' '}
            <span className="text-primary">Daniel's Discourse</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A personal blog focused on introspection and writing about life experiences. 
            Thoughtful reflections for readers from all walks of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/blog">
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/about">About Daniel</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Latest Reflections</h2>
            <p className="text-muted-foreground text-lg">
              Recent thoughts and insights from the journey of life
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </div>
                    <h3 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <Badge variant="secondary" className="w-fit">
                      {post.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {parseTags(post.tags).slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 group/link"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-muted-foreground text-lg">
              Join our community of thoughtful readers. Get new articles delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={subscribing}>
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </section>
      </div>
    </>
  )
}