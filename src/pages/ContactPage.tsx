import { useState } from 'react'
import { Mail, Send, MessageCircle, Clock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../hooks/use-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setSending(true)
    
    // Simulate sending email (in a real app, this would send to your backend)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive"
      })
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'd love to hear from you. Whether you have thoughts on a post, questions, 
            or just want to connect, don't hesitate to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your thoughts..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a 
                      href="mailto:danielsimon.dika@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      danielsimon.dika@gmail.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground text-sm">
                      I typically respond within 24-48 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Thoughtful responses:</strong> I read every message carefully and respond with intention.
                  </p>
                  <p>
                    <strong className="text-foreground">Open dialogue:</strong> Whether you agree or disagree with my posts, I welcome respectful conversation.
                  </p>
                  <p>
                    <strong className="text-foreground">Personal connection:</strong> I believe in the power of authentic human connection through shared stories.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <blockquote className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4">
                  "The most important thing in communication is hearing what isn't said."
                </blockquote>
                <p className="text-xs text-muted-foreground mt-2">— Peter Drucker</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're sharing your own reflections, asking questions about a post, 
            or simply want to say hello, I'm here to listen. Every message matters, 
            and every conversation has the potential to spark new insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="mailto:danielsimon.dika@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                Email Directly
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}