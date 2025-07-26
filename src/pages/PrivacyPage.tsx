import SEO from '../components/SEO'
import { siteConfig } from '../config/site'

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Daniel's Discourse blog. Learn how we collect, use, and protect your personal information."
        url="/privacy"
      />
      
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Daniel's Discourse ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website {siteConfig.baseUrl.replace('https://', '')} 
                  (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this 
                  privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-medium mb-2">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Subscribe to our newsletter</li>
                      <li>Leave comments on blog posts</li>
                      <li>Contact us through our contact form</li>
                      <li>Create an account on our site</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg font-medium mb-2">Automatically Collected Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      When you visit our site, we may automatically collect certain information about your device, 
                      including information about your web browser, IP address, time zone, and some of the cookies 
                      that are installed on your device.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may use the information we collect from you in the following ways:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>To send you our newsletter (if you have subscribed)</li>
                  <li>To respond to your comments and questions</li>
                  <li>To improve our website and user experience</li>
                  <li>To analyze website usage and trends</li>
                  <li>To prevent fraudulent transactions and monitor against theft</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our site and hold certain 
                  information. Cookies are files with small amounts of data which may include an anonymous unique 
                  identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                  being sent.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Third-Party Services</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-medium mb-2">Google AdSense</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We use Google AdSense to display advertisements on our site. Google may use cookies to serve 
                      ads based on your prior visits to our website or other websites. You may opt out of personalized 
                      advertising by visiting Google's Ads Settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg font-medium mb-2">Analytics</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may use third-party analytics services to monitor and analyze web traffic and user behavior 
                      to improve our services.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized 
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
                  or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>The right to access your personal information</li>
                  <li>The right to rectify inaccurate personal information</li>
                  <li>The right to erase your personal information</li>
                  <li>The right to restrict processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our site is not intended for children under the age of 13. We do not knowingly collect personal 
                  information from children under 13. If you are a parent or guardian and believe your child has 
                  provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium">Daniel Simon</p>
                  <p className="text-muted-foreground">Email: danielsimon.dika@gmail.com</p>
                  <p className="text-muted-foreground">Website: {siteConfig.baseUrl.replace('https://', '')}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}