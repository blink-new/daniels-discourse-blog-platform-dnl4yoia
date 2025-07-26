import { useState, useEffect } from 'react'
import { Shield, Users, FileText, MessageSquare, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { blink } from '../blink/client'

interface AdminPageProps {
  user: any
}

interface Stats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalComments: number
  pendingComments: number
  totalSubscribers: number
}

export default function AdminPage({ user }: AdminPageProps) {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    totalSubscribers: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const [posts, comments, subscribers] = await Promise.all([
        blink.db.blogPosts.list(),
        blink.db.comments.list(),
        blink.db.newsletterSubscribers.list()
      ])

      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        totalComments: comments.length,
        pendingComments: comments.filter(c => c.status === 'pending').length,
        totalSubscribers: subscribers.filter(s => s.status === 'active').length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold mb-4">Access Restricted</h1>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to access the admin dashboard.
          </p>
          <Button onClick={() => blink.auth.login()}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.displayName || user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPosts}</div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    {stats.publishedPosts} published
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {stats.draftPosts} drafts
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalComments}</div>
                {stats.pendingComments > 0 && (
                  <div className="mt-2">
                    <Badge variant="destructive" className="text-xs">
                      {stats.pendingComments} pending review
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Active subscribers
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Manage your blog posts, create new content, and organize your articles.
              </p>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Categories
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Engage with your readers and manage community interactions.
              </p>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Review Comments
                  {stats.pendingComments > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {stats.pendingComments}
                    </Badge>
                  )}
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Subscribers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-heading text-lg font-semibold mb-2">
            Admin Features Coming Soon
          </h3>
          <p className="text-muted-foreground text-sm">
            This is a preview of the admin dashboard. Full content management features, 
            including a rich text editor for creating and editing posts, comment moderation, 
            and subscriber management will be available in the next update.
          </p>
        </div>
      </div>
    </div>
  )
}