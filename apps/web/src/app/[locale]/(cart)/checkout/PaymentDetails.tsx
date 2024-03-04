"use client";
import { Flex, RadioGroup, Text, TextFieldInput } from "@radix-ui/themes";
import type {
  profileTranslations,
  checkoutTranslations,
} from "../../../../../messages/messagesKeys";
import { PaymentTypeEnum } from "@/lib/types/paymob";
import { useAtom, useSetAtom } from "jotai";
import {
  mobileWalletAtom,
  paymentTypeAtom,
} from "@/lib/atoms/orderCheckoutAtoms";

type Props = { translations: checkoutTranslations & profileTranslations };

const PaymentDetails = ({ translations }: Props) => {
  const [paymentType, setPaymentType] = useAtom(paymentTypeAtom);
  const setMobileWallet = useSetAtom(mobileWalletAtom);
  return (
    <RadioGroup.Root
      variant="soft"
      size="3"
      onValueChange={(val: PaymentTypeEnum) => setPaymentType(val)}
    >
      <Flex gap="2" direction="column">
        <Flex gap="2">
          <RadioGroup.Item
            className="bg-whiteA-1 shadow-1 shadow-panel-translucent"
            value={PaymentTypeEnum.CARD}
          />
          <Text as="label" size="3">
            {translations.card}
          </Text>
        </Flex>
        <Flex gap="2">
          <RadioGroup.Item
            className="bg-whiteA-1 shadow-1 shadow-panel-translucent"
            value={PaymentTypeEnum.MOBILEWALLET}
          />
          <Text as="label" size="3">
            {translations.mobilewallet}
          </Text>
          {paymentType === PaymentTypeEnum.MOBILEWALLET && (
            <TextFieldInput
              minLength={11}
              maxLength={11}
              pattern="/^[0-9]+$/"
              onChange={(input) => setMobileWallet(input.target.value)}
              size="1"
            />
          )}
        </Flex>
        <Flex gap="2">
          <RadioGroup.Item
            className="bg-whiteA-1 shadow-1 shadow-panel-translucent"
            value={PaymentTypeEnum.CASH}
          />

          <Text as="label" size="3">
            {translations.cash}
          </Text>
        </Flex>
      </Flex>
    </RadioGroup.Root>
  );
};

export default PaymentDetails;
