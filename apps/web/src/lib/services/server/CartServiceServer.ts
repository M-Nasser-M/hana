import type { Session } from "@/lib/types/sharedTypes";
import { serverApiAuth } from "./ServerApi";
import qs from "qs";
import type { Cart } from "@/lib/types/cart";

export async function getCart(session: Session) {
  const queryString = qs.stringify({
    populate: { cart_items: { populate: "product" } },
  });
  try {
    const response = await serverApiAuth.get<Cart>(
      `/carts/${session.user.cartId}?${queryString}`
    );
    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
}

export async function updateCartItem(cartItemId: number, quantity: number) {
  try {
    const response = await serverApiAuth.put(`/cart-items/${cartItemId}`, {
      quantity,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
}

export async function createCartItem(
  cartId: number,
  productId: number,
  quantity: number
) {
  try {
    const response = await serverApiAuth.post(`/cart-items`, {
      cart: cartId,
      product: productId,
      quantity,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
}

export async function createCart(userId: number) {
  try {
    const response = await serverApiAuth.post<Cart>("/carts", {
      users_permissions_user: userId,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
}
