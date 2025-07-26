import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Shield, FileText, MessageSquare, Users, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Alert, AlertDescription } from '../components/ui/alert'
import { blink } from '../blink/client'
import PostEditor from '../components/admin/PostEditor'
import SecurityNotice from '../components/admin/SecurityNotice'
import UrlManager from '../components/UrlManager'

interface User {
  id: string
  email: string
  displayName?: string
}

interface AdminDashboardProps {
  user: User | null
}

interface Stats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalComments: number
  pendingComments: number
  totalSubscribers: number
}

interface BlogPost {
  id: string
  title: string
  slug: string
  status: string
  createdAt: string
  updatedAt: string
  categoryId: string
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'posts' | 'comments' | 'subscribers'>('dashboard')
  const [showPostEditor, setShowPostEditor] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | undefined>()
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    totalSubscribers: 0
  })
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const [postsData, commentsData, subscribersData] = await Promise.all([
        blink.db.blogPosts.list({ orderBy: { createdAt: 'desc' } }),
        blink.db.comments.list(),
        blink.db.newsletterSubscribers.list()
      ])

      setPosts(postsData)
      setStats({
        totalPosts: postsData.length,
        publishedPosts: postsData.filter(p => p.status === 'published').length,
        draftPosts: postsData.filter(p => p.status === 'draft').length,
        totalComments: commentsData.length,
        pendingComments: commentsData.filter(c => c.status === 'pending').length,
        totalSubscribers: subscribersData.filter(s => s.status === 'active').length
      })
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [user])

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await blink.db.blogPosts.delete(postId)
      await fetchData() // Refresh data
    } catch (err) {
      setError('Failed to delete post')
      console.error('Error deleting post:', err)
    }
  }

  const handlePostSaved = () => {
    setShowPostEditor(false)
    setEditingPostId(undefined)
    fetchData() // Refresh data
  }

  // Require authentication - redirect to sign in if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="max-w-md w-full mx-auto p-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-heading text-2xl font-bold mb-4">Admin Access Required</h1>
              <p className="text-muted-foreground mb-6">
                This is a secure admin area. Please sign in to continue.
              </p>
              <Button onClick={() => blink.auth.login('/admin')} className="w-full">
                Sign In to Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Daniel's Discourse</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="description" content="Private admin area for content management" />
      </Helmet>
      
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <SecurityNotice />
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.displayName || user?.email}</p>
              <p className="text-xs text-muted-foreground/70">🔒 Private Admin Area - Content Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => window.open('/', '_blank')}>
              View Site
            </Button>
            <Button onClick={() => blink.auth.logout('/')}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={currentView === 'posts' ? 'default' : 'outline'}
            onClick={() => setCurrentView('posts')}
          >
            Posts ({stats.totalPosts})
          </Button>
          <Button
            variant={currentView === 'comments' ? 'default' : 'outline'}
            onClick={() => setCurrentView('comments')}
          >
            Comments ({stats.pendingComments > 0 ? stats.pendingComments : stats.totalComments})
          </Button>
          <Button
            variant={currentView === 'subscribers' ? 'default' : 'outline'}
            onClick={() => setCurrentView('subscribers')}
          >
            Subscribers ({stats.totalSubscribers})
          </Button>
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    Create and manage your blog posts with the built-in editor.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      className="w-full justify-start" 
                      onClick={() => setShowPostEditor(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Post
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setCurrentView('posts')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Manage All Posts
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
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setCurrentView('comments')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Review Comments
                      {stats.pendingComments > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {stats.pendingComments}
                        </Badge>
                      )}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setCurrentView('subscribers')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Subscribers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* URL Management */}
            <div className="mt-8">
              <h3 className="font-heading text-xl font-semibold mb-4">Website URL Management</h3>
              <UrlManager />
            </div>
          </div>
        )}

        {/* Posts View */}
        {currentView === 'posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold">Manage Posts</h2>
              <Button onClick={() => setShowPostEditor(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingPostId(post.id)
                                setShowPostEditor(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comments View */}
        {currentView === 'comments' && (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold">Manage Comments</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">Comment Management</h3>
                <p className="text-muted-foreground">
                  Comment moderation features will be available in the next update.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subscribers View */}
        {currentView === 'subscribers' && (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold">Newsletter Subscribers</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2">Subscriber Management</h3>
                <p className="text-muted-foreground">
                  Subscriber management and email campaign features will be available in the next update.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Post Editor Dialog */}
        <Dialog open={showPostEditor} onOpenChange={setShowPostEditor}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPostId ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
            </DialogHeader>
            <PostEditor
              postId={editingPostId}
              onSave={handlePostSaved}
              onCancel={() => {
                setShowPostEditor(false)
                setEditingPostId(undefined)
              }}
            />
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </>
  )
}