import type { RequestHandler } from "./$types";
import { validateToken } from "sveltekit-turnstile";
import { SECRET_TURNSTILE_KEY } from "$env/static/private";
import { error, json } from "@sveltejs/kit";
import medusa from "$lib/server/medusa";

export const POST: RequestHandler = async ({ request, locals }) => {
  const data = await request.json();
  console.log("data:", data);
  let token = data.token as string;
  console.log("secretkey:", SECRET_TURNSTILE_KEY);
  console.log("token:", token);
  if (token !== "no-token-required") {
    console.log(
      "validating token...",
      await validateToken(token, SECRET_TURNSTILE_KEY)
    );
    if (!(await validateToken(token, SECRET_TURNSTILE_KEY)))
      throw error(400, { message: "Bot risk" });
  }

  let cart = await medusa.createPaymentSessions(locals);
  console.log("cart::", cart);

  if (!cart.total) {
    throw error(400, { message: "Could not create payment sessions" });
  }

  // the error is here at selecting payment session to stripe
  cart = await medusa.selectPaymentSession(locals, "stripe");
  if (!cart.total) {
    throw error(400, { message: "Could not select payment provider" });
  }

  let shippingOptions = await medusa.getShippingOptions(locals);
  if (!shippingOptions) {
    throw error(400, { message: "Could not get shipping options" });
  }

  return json({ cart, shippingOptions });
};
