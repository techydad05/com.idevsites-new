import type { PageServerLoad } from "./$types";
import medusa from "$lib/server/medusa";

export const load: PageServerLoad = async function () {
  try {
    let products = await medusa.getProducts();
    let collections = await medusa.getCollections()
    return {
      products,
      collections
    };
  } catch (error) {
    console.log(error);
  }
};

// for @medusajs/medus-js client
// let { products } = await medusa.products.list();
// let { collections } = await medusa.collections.list();
