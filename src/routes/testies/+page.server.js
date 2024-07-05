// // @ts-nocheck
// import medusa from "$lib/server/medusa";
// import { redirect } from "@sveltejs/kit";

// export async function load({ locals }) {
//   const user = locals.user;

//   if (!user) {
//     throw redirect(302, '/auth');
//   }

//   return { user };
// }

// // /** @type {import('@sveltejs/kit').Load} */
// // export const load = async ({ locals, url }) => {
// //   if (!locals.user) throw redirect(307, "/auth");

// //   //   const resourceUrl = `api`;
// //   //   const res = await fetch(resourceUrl);

// //   //   if (res.ok) {
// //   //     return {
// //   //       status: res.status,
// //   //       props: {
// //   //          propName: await res.json()
// //   //       }
// //   //     };
// //   //   }

// //   //   return {
// //   //     status: res.status,
// //   //     error: new Error(`Could not load url`)
// //   //   };
// // };
