import Medusa from '@medusajs/medusa-js'
import { MEDUSA_BACKEND_URL, CLOUDFLARE_ACCESS_ID, CLOUDFLARE_ACCESS_SECRET } from '$env/static/private'
export default new Medusa({
   baseUrl: MEDUSA_BACKEND_URL,
   maxRetries: 3,
   customHeaders: {
      'CF-Access-Client-Id': CLOUDFLARE_ACCESS_ID,
      'CF-Access-Client-Secret': CLOUDFLARE_ACCESS_SECRET
   },
})

