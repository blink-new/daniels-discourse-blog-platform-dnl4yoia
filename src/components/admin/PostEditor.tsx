import { useState, useEffect, useCallback } from 'react'
import { Save, Eye, Upload, X, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Alert, AlertDescription } from '../ui/alert'
import { blink } from '../../blink/client'

interface PostEditorProps {
  postId?: string
  onSave: () => void
  onCancel: () => void
}

interface Category {
  id: string
  name: string
  slug: string
}

interface PostData {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  categoryId: string
  tags: string[]
  status: 'draft' | 'published'
  seoTitle: string
  seoDescription: string
}

export default function PostEditor({ postId, onSave, onCancel }: PostEditorProps) {
  const [post, setPost] = useState<PostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categoryId: '',
    tags: [],
    status: 'draft',
    seoTitle: '',
    seoDescription: ''
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)

  const loadCategories = async () => {
    try {
      const data = await blink.db.categories.list()
      setCategories(data)
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

  const loadPost = useCallback(async () => {
    if (!postId) return
    
    setLoading(true)
    try {
      const posts = await blink.db.blogPosts.list({
        where: { id: postId }
      })
      if (posts.length > 0) {
        const postData = posts[0]
        setPost({
          title: postData.title || '',
          slug: postData.slug || '',
          excerpt: postData.excerpt || '',
          content: postData.content || '',
          featuredImage: postData.featured_image || '',
          categoryId: postData.category_id || '',
          tags: postData.tags ? postData.tags.split(',') : [],
          status: postData.status || 'draft',
          seoTitle: postData.seo_title || '',
          seoDescription: postData.seo_description || ''
        })
      }
    } catch (err) {
      setError('Failed to load post')
      console.error('Error loading post:', err)
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    loadCategories()
    if (postId) {
      loadPost()
    }
  }, [postId, loadPost])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      seoTitle: prev.seoTitle || title
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const { publicUrl } = await blink.storage.upload(
        file,
        `blog-images/${Date.now()}-${file.name}`,
        { upsert: true }
      )
      setPost(prev => ({ ...prev, featuredImage: publicUrl }))
    } catch (err) {
      setError('Failed to upload image')
      console.error('Error uploading image:', err)
    } finally {
      setUploadingImage(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSave = async () => {
    if (!post.title.trim()) {
      setError('Title is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const user = await blink.auth.me()
      const postData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featuredImage,
        category_id: post.categoryId,
        category: categories.find(c => c.id === post.categoryId)?.name || '',
        tags: post.tags.join(','),
        status: post.status,
        seo_title: post.seoTitle,
        seo_description: post.seoDescription,
        author_id: user.id,
        author_name: user.displayName || user.email,
        updated_at: new Date().toISOString(),
        published_at: post.status === 'published' ? new Date().toISOString() : null
      }

      if (postId) {
        await blink.db.blogPosts.update(postId, postData)
      } else {
        await blink.db.blogPosts.create({
          id: `post_${Date.now()}`,
          ...postData,
          created_at: new Date().toISOString()
        })
      }

      onSave()
    } catch (err) {
      setError('Failed to save post')
      console.error('Error saving post:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">
          {postId ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save {post.status === 'published' ? 'Changes' : 'Draft'}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={post.content}
                  onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your post content here..."
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports Markdown formatting
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={post.seoTitle}
                  onChange={(e) => setPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="SEO optimized title..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {post.seoTitle.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={post.seoDescription}
                  onChange={(e) => setPost(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Brief description for search engines..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {post.seoDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="published" className="text-sm">Draft</Label>
                  <Switch
                    id="published"
                    checked={post.status === 'published'}
                    onCheckedChange={(checked) => 
                      setPost(prev => ({ ...prev, status: checked ? 'published' : 'draft' }))
                    }
                  />
                  <Label htmlFor="published" className="text-sm">Published</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.featuredImage ? (
                <div className="relative">
                  <img
                    src={post.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setPost(prev => ({ ...prev, featuredImage: '' }))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload featured image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? 'Uploading...' : 'Choose Image'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={post.categoryId}
                onValueChange={(value) => setPost(prev => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button size="sm" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer">
                    {tag}
                    <X
                      className="h-3 w-3 ml-1"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}