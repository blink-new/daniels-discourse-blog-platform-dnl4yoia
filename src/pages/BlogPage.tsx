import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, ArrowRight, Filter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { blink } from '../blink/client'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { SidebarAd, InContentAd } from '../components/AdSense'

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

interface Category {
  id: string
  name: string
  slug: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const fetchPosts = useCallback(async () => {
    try {
      const query: any = {
        where: { 
          status: 'published',
          ...(selectedCategory !== 'all' && { category: selectedCategory })
        },
        orderBy: { published_at: 'desc' }
      }

      const allPosts = await blink.db.blogPosts.list(query)
      
      // Filter by search term
      let filteredPosts = allPosts
      if (searchTerm) {
        filteredPosts = allPosts.filter(post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      setPosts(filteredPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchTerm])

  const fetchCategories = async () => {
    try {
      const categoriesData = await blink.db.categories.list({
        orderBy: { name: 'asc' }
      })
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [fetchPosts])

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

  // Pagination
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <SEO
        title="Blog - Daniel's Discourse"
        description="Explore thoughtful articles and reflections on life, personal growth, philosophy, and the human experience. A collection of introspective writing by Daniel Simon."
        keywords="blog, articles, personal growth, philosophy, life reflections, introspection, thoughtful writing, Daniel Simon"
        url="/blog"
      />
      <StructuredData type="blog" data={{ posts: posts }} />
      
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            All Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore thoughts, reflections, and insights on life's journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Top Ad Placement */}
        <div className="mb-8">
          <InContentAd />
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-4">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? "Try adjusting your search or filter criteria."
                : "No articles have been published yet."}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
        </div>
      </div>
    </>
  )
}