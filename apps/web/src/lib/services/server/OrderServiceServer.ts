import { type Order, PaymenetStatusEnum } from "@/lib/types/order";
import { serverApiAuth } from "./ServerApi";

export async function updateOrderPaymobTransactionIDByPaymobOrderID(
  paymobOrderID: number,
  paymob_transaction_id: number,
  payment_status: PaymenetStatusEnum
) {
  try {
    const response = await serverApiAuth.put<Order>(
      `/orders/paymob/${paymobOrderID}`,
      {
        paymob_transaction_id,
        payment_status,
      }
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error fetching data"
    );
    return null;
  }
}
