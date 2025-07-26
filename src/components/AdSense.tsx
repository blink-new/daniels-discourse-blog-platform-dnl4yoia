import { useEffect } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  adLayout?: string
  adLayoutKey?: string
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  className = '',
  style = { display: 'block' }
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with actual AdSense client ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Sidebar Ad Component
export function SidebarAd() {
  return (
    <div className="mb-8">
      <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
      <AdSense
        adSlot="1234567890"
        adFormat="rectangle"
        className="border border-muted rounded-lg p-4 bg-muted/20"
        style={{ 
          display: 'block',
          width: '100%',
          height: '250px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          textAlign: 'center',
          lineHeight: '250px',
          color: '#6c757d',
          fontSize: '14px'
        }}
      />
    </div>
  )
}

// In-Content Ad Component
export function InContentAd() {
  return (
    <div className="my-8">
      <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
      <AdSense
        adSlot="0987654321"
        adFormat="auto"
        className="border border-muted rounded-lg p-4 bg-muted/20"
        style={{ 
          display: 'block',
          width: '100%',
          height: '200px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          textAlign: 'center',
          lineHeight: '200px',
          color: '#6c757d',
          fontSize: '14px'
        }}
      />
    </div>
  )
}

// Footer Ad Component
export function FooterAd() {
  return (
    <div className="mt-8 mb-4">
      <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
      <AdSense
        adSlot="1122334455"
        adFormat="horizontal"
        className="border border-muted rounded-lg p-4 bg-muted/20"
        style={{ 
          display: 'block',
          width: '100%',
          height: '100px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          textAlign: 'center',
          lineHeight: '100px',
          color: '#6c757d',
          fontSize: '14px'
        }}
      />
    </div>
  )
}