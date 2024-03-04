import { updateOrderPaymobTransactionIDByPaymobOrderID } from "@/lib/services/server/OrderServiceServer";
import { PaymenetStatusEnum } from "@/lib/types/order";
import { PaymobHmacTransactionObjectBackendSchema } from "@/lib/types/paymob";
import { compareHmacBackEnd } from "@/lib/utils/hmacCompare";
import { serverEnv } from "@/serverEnv";
import { safeParse } from "valibot";

export async function POST(request: Request) {
  const body = await request.json();
  //get searchparams from request
  const { searchParams } = new URL(request.url);
  const hmac = searchParams.get("hmac");

  const validatedRequest = safeParse(
    PaymobHmacTransactionObjectBackendSchema,
    body
  );

  if (!validatedRequest.success)
    return new Response("request body validation failed", { status: 400 });

  const compareResult = compareHmacBackEnd(
    serverEnv.PAYMOB_HMAC_SECRET,
    validatedRequest.output,
    hmac!
  );

  if (!compareResult)
    return new Response("Invalid request Hmac Comparison Failed", {
      status: 400,
    });

  const status =
    (validatedRequest.output.obj.success && PaymenetStatusEnum.SUCCESS) ||
    (validatedRequest.output.obj.pending && PaymenetStatusEnum.PENDING) ||
    PaymenetStatusEnum.DECLINED;

  const updatedData = await updateOrderPaymobTransactionIDByPaymobOrderID(
    validatedRequest.output.obj.order.id,
    +validatedRequest.output.obj.data.transaction_no,
    status
  );

  console.log(updatedData);

  return new Response("request Valid");
}
