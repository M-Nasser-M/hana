"use server";

import { serverApiAuth } from "../server/ServerApi";
import type { Session } from "@/lib/types/sharedTypes";
import { CreateCartError } from "@/lib/utils/exceptions";
import {
  createCart,
  createCartItem,
  getCart,
  updateCartItem,
} from "../server/CartServiceServer";

export const addCartItem = async (
  productId: number,
  quantity: number,
  session: Session
) => {
  const cart = await getCart(session);
  if (!cart || !session.user.cartId) {
    const newCart = await createCart(session.user.id);
    if (!newCart) throw new CreateCartError();
    return createCartItem(newCart.data.id, productId, quantity);
  }

  if (cart.data.cart_items && cart.data.cart_items.length > 0) {
    const cartItem = cart.data.cart_items.find(
      (cartItem) => cartItem.product?.id === productId
    );

    if (cartItem) {
      return updateCartItem(cartItem.id, quantity);
    }
  }

  return createCartItem(session.user.cartId, productId, quantity);
};

export const removeCartItem = async (cartItemId: number) => {
  try {
    const response = await serverApiAuth.delete(`/cart-items/${cartItemId}`);
    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const removeCartItemUsingProductId = async (
  productId: number,
  session: Session
) => {
  const cart = await getCart(session);
  if (cart && cart.data.cart_items && cart.data.cart_items.length > 0) {
    const cartItem = cart.data.cart_items.find(
      (cartItem) => cartItem.product?.id === productId
    );
    if (cartItem) {
      return removeCartItem(cartItem.id);
    }
  }
  return null;
};
