"use client";
import {
  mobileWalletAtom,
  orderSummaryAtom,
  paymentTypeAtom,
  shippingDetailsAtom,
} from "@/lib/atoms/orderCheckoutAtoms";
import { type checkoutTranslations } from "../../../../../messages/messagesKeys";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import {
  getCardPaymentLink,
  getMobilePaymentLink,
} from "@/lib/services/client/PaymobServiceClient";
import { type BillingData, PaymentTypeEnum } from "@/lib/types/paymob";
import { cartAtom, sessionAtom } from "@/lib/atoms/atoms";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { safeParse } from "valibot";
import { PhoneSchema } from "@/lib/types/sharedTypes";

type Props = { translations: checkoutTranslations };

const OrderSummary = ({ translations }: Props) => {
  const orderSummary = useAtomValue(orderSummaryAtom);
  const shippingDetails = useAtomValue(shippingDetailsAtom);
  const paymentType = useAtomValue(paymentTypeAtom);
  const session = useAtomValue(sessionAtom);
  const mobileWallet = useAtomValue(mobileWalletAtom);
  const cartItems = useAtomValue(cartAtom);

  const router = useRouter();

  async function handleOrderPalcement() {
    if (!shippingDetails) {
      toast("Shipping Address not selected", {
        description: " please Select Shipping Address to place your order",
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }
    if (!paymentType) {
      toast("Payment Method not selected", {
        description: " please Select Payment Method to place your order",
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }
    if (!session) {
      toast("Session not found", {
        description: " please login to place your order",
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }
    const bilingData: BillingData = {
      first_name: shippingDetails.first_name,
      last_name: shippingDetails.last_name,
      email: session.user.email,
      phone_number: shippingDetails.phone,
      apartment: "NA",
      building: "NA",
      city: "NA",
      country: "NA",
      street: "NA",
      floor: "NA",
      postal_code: "NA",
      shipping_method: "NA",
      state: "NA",
    };
    if (paymentType === PaymentTypeEnum.CARD) {
      const response = await getCardPaymentLink(
        orderSummary.total,
        bilingData,
        cartItems,
        session,
        orderSummary,
        shippingDetails
      );
      if (response) router.push(response);
    }
    if (paymentType === PaymentTypeEnum.MOBILEWALLET) {
      const validatedPhone = safeParse(PhoneSchema, mobileWallet);
      if (!validatedPhone.success) {
        toast("Invalid Phone Number", {
          description: " please enter a valid phone number",
          action: { label: "dismiss", onClick: () => toast.dismiss() },
        });
        return;
      }
      const response = await getMobilePaymentLink(
        orderSummary.total,
        validatedPhone.output,
        bilingData,
        cartItems,
        session,
        orderSummary,
        shippingDetails
      );
      if (response) router.push(response.redirect_url);
    }

    if (paymentType === PaymentTypeEnum.CASH) {
      return;
    }
  }
  return (
    <>
      <Flex direction="column" gap="4">
        <Flex direction="row" justify="between" gap="4">
          <Text as="label">Subtotal:</Text>
          <Text>{`${orderSummary.subtotal}`}</Text>
        </Flex>
        <Flex direction="row" justify="between" gap="4">
          <Text as="label">{translations.shipping}:</Text>
          <Text>{orderSummary.shipping}</Text>
        </Flex>
        <Flex direction="row" justify="between" gap="4">
          <Text as="label">{translations.tax}:</Text>
          <Text>{orderSummary.tax}</Text>
        </Flex>
        <hr />
        <Flex direction="row" justify="between" gap="4">
          <Text as="label">{translations.total}:</Text>
          <Text>{orderSummary.total}</Text>
        </Flex>
        <hr />
        <Flex direction="row" justify="between" gap="4"></Flex>
      </Flex>
      <Button onClick={handleOrderPalcement}>Place Order</Button>
    </>
  );
};

export default OrderSummary;
