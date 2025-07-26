import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'daniels-discourse-blog-platform-dnl4yoia',
  authRequired: false // Allow public access to the blog
})