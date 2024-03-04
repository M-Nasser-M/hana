import { useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { cartAtom, sessionAtom } from "@/lib/atoms/atoms";
import {
  addCartItem,
  removeCartItemUsingProductId,
} from "@/lib/services/serverActions/CartActions";
import type {
  localStorageCartItem,
  localStorageCartItems,
} from "../types/cart";
import { orderSubtotalAtom } from "../atoms/orderCheckoutAtoms";

export const useCart = () => {
  const cartValue = useAtomValue(cartAtom);
  const session = useAtomValue(sessionAtom);
  const setCart = useSetAtom(cartAtom);

  const useHydrateCart = (HydrateValue: localStorageCartItems) =>
    useHydrateAtoms([[cartAtom, HydrateValue]]);

  const addToCart = (cartItem: localStorageCartItem) => {
    if (session) addCartItem(cartItem.product.id, cartItem.quantity, session);
    setCart([
      cartItem,
      ...cartValue.filter((item) => item.product.id !== cartItem.product.id),
    ]);
  };

  const changeQuantity = (productId: number, quantity: number) => {
    if (session) addCartItem(productId, quantity, session);
    setCart(
      cartValue.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (productId: number) => {
    if (session) removeCartItemUsingProductId(productId, session);
    setCart(cartValue.filter((cartItem) => cartItem.product.id !== productId));
  };

  const cartTotal = useAtomValue(orderSubtotalAtom);

  return {
    cartValue,
    useHydrateCart,
    addToCart,
    removeFromCart,
    changeQuantity,
    setCart,
    cartTotal,
  };
};
