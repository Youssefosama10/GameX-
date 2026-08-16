import { redirect } from "next/navigation";
import { GetUserCart } from "@/API/route.services";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await GetUserCart();

  if (!cart || !cart.items?.length) {
    redirect("/cart");
  }

  return <CheckoutClient cart={cart} />;
}
