import { useState } from 'react'
import { Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Alert, AlertDescription } from '../ui/alert'
import { blink } from '../../blink/client'

interface AdminAuthProps {
  onAuthenticated: () => void
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Use Blink's built-in authentication
      blink.auth.login('/admin')
      // The onAuthenticated will be called by the parent component
      // when the auth state changes
    } catch (err) {
      setError('Authentication failed. Please try again.')
      console.error('Auth error:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-3xl font-bold">Admin Access</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to access Daniel's Discourse admin dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                This admin area is restricted to authorized users only.
              </p>
              <Button 
                onClick={handleSignIn}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In to Admin
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Only the site owner has access to this area.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}