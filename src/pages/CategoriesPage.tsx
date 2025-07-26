import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { blink } from '../blink/client'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [categoriesData, postsData] = await Promise.all([
        blink.db.categories.list({
          orderBy: { name: 'asc' }
        }),
        blink.db.blogPosts.list({
          where: { status: 'published' },
          orderBy: { published_at: 'desc' }
        })
      ])
      
      setCategories(categoriesData)
      setPosts(postsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getPostCountForCategory = (categoryName: string) => {
    return posts.filter(post => post.category === categoryName).length
  }

  const getRecentPostsForCategory = (categoryName: string, limit = 3) => {
    return posts
      .filter(post => post.category === categoryName)
      .slice(0, limit)
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            Categories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore different themes and topics that shape our journey through life. 
            Each category offers a unique lens through which to view our shared human experience.
          </p>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/5"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const postCount = getPostCountForCategory(category.name)
              const recentPosts = getRecentPostsForCategory(category.name)
              
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <Badge variant="secondary">
                        {postCount} {postCount === 1 ? 'post' : 'posts'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    {recentPosts.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                          Recent Posts
                        </h4>
                        <div className="space-y-2">
                          {recentPosts.map((post) => (
                            <Link
                              key={post.id}
                              to={`/blog/${post.slug}`}
                              className="block text-sm hover:text-primary transition-colors group/post"
                            >
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-3 w-3 text-muted-foreground group-hover/post:text-primary transition-colors" />
                                <span className="line-clamp-1">{post.title}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        {postCount > 3 && (
                          <Link
                            to={`/blog?category=${encodeURIComponent(category.name)}`}
                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium group/link"
                          >
                            View all {postCount} posts
                            <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No posts yet in this category
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">
            Explore All Articles
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to dive deeper? Browse all articles or use the search and filter 
            options to find exactly what resonates with you.
          </p>
          <Link to="/blog">
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors">
              <BookOpen className="h-4 w-4" />
              Browse All Articles
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Category Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {categories.length}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {posts.length}
            </div>
            <div className="text-sm text-muted-foreground">Articles</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.round(posts.length / Math.max(categories.length, 1))}
            </div>
            <div className="text-sm text-muted-foreground">Avg per Category</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {categories.find(cat => getPostCountForCategory(cat.name) > 0) ? 
                Math.max(...categories.map(cat => getPostCountForCategory(cat.name))) : 0}
            </div>
            <div className="text-sm text-muted-foreground">Most Popular</div>
          </div>
        </div>
      </div>
    </div>
  )
}