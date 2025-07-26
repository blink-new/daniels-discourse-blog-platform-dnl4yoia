import { Shield, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'

export default function SecurityNotice() {
  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-amber-800 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="font-medium">Secure Admin Area</span>
        </div>
        <p className="mt-1 text-sm">
          This is a private content management system for Daniel's Discourse. 
          This area is not accessible to the public and requires authentication.
        </p>
      </AlertDescription>
    </Alert>
  )
}