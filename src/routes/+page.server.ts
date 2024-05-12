import type { PageServerLoad } from './$types'
import medusa from '$lib/server/medusa'

export const load: PageServerLoad = async function () {
   
   let { products } = await medusa.products.list();
   let { collections } = await medusa.collections.list();   

   
   return { 
      products,
      collections
   }
}