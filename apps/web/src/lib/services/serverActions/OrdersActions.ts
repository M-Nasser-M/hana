"use server";

import type { Session } from "@/lib/types/sharedTypes";
import type { localStorageCartItems } from "@/lib/types/cart";
import { serverApiAuth } from "../server/ServerApi";
import { AddressData } from "@/lib/types/address";
import {
  PaymenetStatusEnum,
  type Order,
  type OrderItem,
  OrderStatusEnum,
  OrderSummary,
} from "@/lib/types/order";
import { decrementAvailableStockUsingId } from "../server/ProductServiceServer";

export async function createOrder(
  cartItems: localStorageCartItems,
  session: Session,
  paymob_order_id: number,
  orderSummary: OrderSummary,
  addressData: AddressData
) {
  try {
    const orderItems = await createOrderItems(cartItems);
    if (!orderItems) throw new Error("order items Creation Error");
    const orderItemsIDS = orderItems.map((item) => item.data.id);
    const response = await serverApiAuth.post<Order>("/orders", {
      estimated_delivery: addressData.governorate.delivery,
      total: orderSummary.total,
      order_status: OrderStatusEnum.ACCEPTED,
      payment_status: PaymenetStatusEnum.PENDING,
      paymob_order_id: paymob_order_id,
      order_items: { connect: orderItemsIDS },
      address: addressData.id,
      users_permissions_user: session.user.id,
    });
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "order items Creation Error"
    );
    if (error) console.log(error);
    return null;
  }
}

export async function createOrderItems(cartItems: localStorageCartItems) {
  try {
    const orderItemsPromises = cartItems.map(async (item) => {
      return serverApiAuth.post<OrderItem>("/order-items", {
        product: item.product.id,
        quantity: item.quantity,
      });
    });
    const response = await Promise.all(orderItemsPromises);

    const stockPromises = cartItems.map((item) => {
      return decrementAvailableStockUsingId(item.product.id);
    });

    await Promise.all(stockPromises);

    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "order items Creation Error"
    );
    return null;
  }
}
