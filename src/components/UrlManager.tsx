import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Copy, ExternalLink, Globe } from 'lucide-react'
import { siteConfig, getDisplayUrl } from '../config/site'
import { getSocialShareUrls, cleanUrlForDisplay } from '../utils/url'

interface UrlManagerProps {
  title?: string
  url?: string
  description?: string
}

export default function UrlManager({ 
  title = "Daniel's Discourse", 
  url = "/", 
  description = "A thoughtful personal blog" 
}: UrlManagerProps) {
  const [copied, setCopied] = useState(false)
  
  const currentUrl = url.startsWith('http') ? url : `${siteConfig.baseUrl}${url}`
  const displayUrl = cleanUrlForDisplay(currentUrl)
  const socialUrls = getSocialShareUrls(title, url, description)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          URL Management
        </CardTitle>
        <CardDescription>
          Current website URL and sharing options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current URL Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Website URL</label>
          <div className="flex items-center gap-2">
            <Input 
              value={displayUrl} 
              readOnly 
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(currentUrl)}
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={currentUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* URL Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">URL Status</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {displayUrl.includes('blink.new') ? 'Blink Hosted' : 'Custom Domain'}
            </Badge>
            <Badge variant="outline">
              {currentUrl.startsWith('https://') ? 'SSL Secured' : 'Not Secured'}
            </Badge>
            <Badge variant="outline">
              SEO Optimized
            </Badge>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Share</label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={socialUrls.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={socialUrls.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={socialUrls.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={socialUrls.email}>
                Email
              </a>
            </Button>
          </div>
        </div>

        {/* Custom Domain Info */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">Custom Domain Setup</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Want a cleaner URL like <code className="bg-muted px-1 rounded">danielsdiscourse.com</code>? 
            Custom domains are available for paid Blink users.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="https://blink.new/pricing" target="_blank" rel="noopener noreferrer">
              Learn About Custom Domains
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}