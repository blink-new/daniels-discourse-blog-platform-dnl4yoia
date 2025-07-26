import { Mail, BookOpen, Coffee, Heart } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl font-heading font-bold text-white">D</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            Hello, I'm Daniel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to my corner of the internet, where I share thoughts on life, 
            philosophy, and the beautiful complexity of human experience.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-semibold mb-4">My Story</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      I've always been drawn to the quiet moments—those spaces between the noise 
                      where real thoughts emerge. This blog began as a personal journal, a way to 
                      process the experiences that shape us all: love, loss, growth, and the 
                      endless search for meaning.
                    </p>
                    <p>
                      What started as private reflections has evolved into something I hope resonates 
                      with others walking similar paths. We're all trying to make sense of this 
                      beautiful, complicated existence, and sometimes sharing our stories helps 
                      illuminate the way forward.
                    </p>
                    <p>
                      Through Daniel's Discourse, I explore themes of mindfulness, personal growth, 
                      philosophy, and the art of living intentionally. Each post is an invitation 
                      to pause, reflect, and perhaps see the world through a slightly different lens.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-semibold mb-4">What You'll Find Here</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Life Reflections</h3>
                        <p className="text-sm text-muted-foreground">
                          Personal insights from life's journey
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Coffee className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Philosophy</h3>
                        <p className="text-sm text-muted-foreground">
                          Deep thoughts on existence and meaning
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Mindfulness</h3>
                        <p className="text-sm text-muted-foreground">
                          Practices for mindful living
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Community</h3>
                        <p className="text-sm text-muted-foreground">
                          Connecting with fellow travelers
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-4">Get in Touch</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    I'd love to hear from you. Whether you have thoughts on a post, 
                    questions, or just want to connect, don't hesitate to reach out.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Me
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-4">Recent Thoughts</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Explore my latest reflections and join the conversation.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/blog">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read the Blog
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-4">Philosophy</h3>
                  <blockquote className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4">
                    "The unexamined life is not worth living, but the over-examined 
                    life is not worth living either. Balance is everything."
                  </blockquote>
                  <p className="text-xs text-muted-foreground mt-2">— Personal reflection</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">
            Join the Journey
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If these words resonate with you, I invite you to join our community of 
            thoughtful readers. Together, we can explore life's big questions and 
            find meaning in the everyday moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/blog">Start Reading</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}