import { MedusaClient } from 'sveltekit-medusa-client'
import { MEDUSA_BACKEND_URL, CLOUDFLARE_ACCESS_ID, CLOUDFLARE_ACCESS_SECRET } from '$env/static/private'

export default new MedusaClient(MEDUSA_BACKEND_URL, { 
   headers: {
      'CF-Access-Client-Id': CLOUDFLARE_ACCESS_ID,
      'CF-Access-Client-Secret': CLOUDFLARE_ACCESS_SECRET,
   },
   retry: 0,
   persistentCart: true
})

// for @medusajs/medusa-js client
// import Medusa from '@medusajs/medusa-js'
// export default new Medusa({
//    baseUrl: MEDUSA_BACKEND_URL,
//    maxRetries: 3,
//    customHeaders: {
//       'CF-Access-Client-Id': CLOUDFLARE_ACCESS_ID,
//       'CF-Access-Client-Secret': CLOUDFLARE_ACCESS_SECRET
//    },
// })

