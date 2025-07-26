import SEO from '../components/SEO'
import { siteConfig } from '../config/site'

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of service for Daniel's Discourse blog. Read our terms and conditions for using our website."
        url="/terms"
      />
      
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="font-heading text-4xl font-bold mb-8">Terms of Service</h1>
            
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Daniel's Discourse (the "Site"), you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Daniel's Discourse is a personal blog platform that provides thoughtful content about life 
                  experiences, personal growth, and introspective writing. The service includes blog posts, 
                  newsletter subscriptions, and community features such as comments.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">User Accounts</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    When you create an account with us, you must provide information that is accurate, complete, 
                    and current at all times. You are responsible for safeguarding the password and for all 
                    activities that occur under your account.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree not to disclose your password to any third party and to take sole responsibility 
                    for activities and actions under your password, whether or not you have authorized such 
                    activities or actions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">User Content</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Our service may allow you to post, link, store, share and otherwise make available certain 
                    information, text, graphics, videos, or other material ("Content"). You are responsible for 
                    the Content that you post to the service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By posting Content to the service, you grant us the right and license to use, modify, publicly 
                    perform, publicly display, reproduce, and distribute such Content on and through the service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>The Content is yours or you have the right to use it</li>
                    <li>The Content does not infringe any third-party rights</li>
                    <li>The Content does not violate any applicable law or regulation</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Comments Policy</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We welcome thoughtful comments and discussions on our blog posts. However, we reserve the 
                    right to moderate and remove comments that:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Are spam or promotional in nature</li>
                    <li>Contain offensive, abusive, or inappropriate language</li>
                    <li>Are off-topic or irrelevant to the post</li>
                    <li>Violate any laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The service and its original content, features, and functionality are and will remain the 
                  exclusive property of Daniel's Discourse and its licensors. The service is protected by 
                  copyright, trademark, and other laws. Our trademarks and trade dress may not be used in 
                  connection with any product or service without our prior written consent.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information on this website is provided on an "as is" basis. To the fullest extent 
                  permitted by law, this Company excludes all representations, warranties, conditions and 
                  terms whether express or implied, statutory or otherwise.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Daniel's Discourse, nor its directors, employees, partners, agents, 
                  suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately, without 
                  prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                  limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms 
                  taking effect.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
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