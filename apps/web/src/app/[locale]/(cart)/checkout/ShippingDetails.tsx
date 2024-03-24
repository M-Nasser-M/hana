"use client";
import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import type { GovernorateData } from "@/lib/types/city-governorate";
import { Card, Flex, RadioGroup, Text } from "@radix-ui/themes";
import { type Addresses } from "@/lib/types/address";
import dynamic from "next/dynamic";
import {
  type profileTranslations,
  type checkoutTranslations,
} from "../../../../../messages/messagesKeys";
import { atom, useSetAtom } from "jotai";
import {
  orderShippingAtom,
  shippingDetailsAtom,
} from "@/lib/atoms/orderCheckoutAtoms";

type Props = {
  translations: checkoutTranslations & profileTranslations;
  addresses: Addresses;
  governorates: GovernorateData[];
};
const AddAddressForm = dynamic(() => import("../../profile/AddAddressForm"));
const EditAddressForm = dynamic(() => import("../../profile/EditAddressForm"));
const DeleteAddressButton = dynamic(
  () => import("../../profile/DeleteAddressButton")
);
const defaultValue = atom(0);

const ShippingDetails = ({ translations, addresses, governorates }: Props) => {
  const locale = useGetLocalFromPathname();
  const setShippingDetailsAtom = useSetAtom(shippingDetailsAtom);
  const setOrderShippingAtom = useSetAtom(orderShippingAtom);
  const setDefaultValue = useSetAtom(defaultValue);
  if (addresses.data.length === 0)
    return (
      <Flex justify="center">
        <AddAddressForm
          big
          translations={translations}
          governorates={governorates}
        />
      </Flex>
    );
  if (addresses.data.length !== 0)
    return (
      <RadioGroup.Root
        variant="soft"
        defaultValue=""
        onValueChange={(val) => {
          setDefaultValue(+val);
          setShippingDetailsAtom(addresses.data[+val]);
          setOrderShippingAtom(addresses.data[+val].governorate.delivery);
        }}
      >
        {addresses.data.map((address, index) => (
          <Card key={address.id}>
            <Flex gap="4" direction="column">
              <Flex gap="2" direction="row">
                <Text as="label">{translations.name}:</Text>
                <Text as="span">{address.name}</Text>
              </Flex>
              <Flex direction="row" justify="between">
                <Text size="2" as="span">
                  {`${address.street}  ${address.building} ${(address?.floor && translations.floor) || ""} ${address?.floor || ""} ${address.district} ${locale === "ar" ? address.governorate.governorate_name_ar : address.governorate.governorate_name_en}`}
                </Text>
                <RadioGroup.Item
                  className="bg-whiteA-1 shadow-1 shadow-panel-translucent"
                  value={`${index}`}
                />
              </Flex>
              {address.details && <Text as="span">{address.details}</Text>}
              <Flex direction="row" gap="2">
                <Text size="2" as="label">
                  {translations.phone}:
                </Text>
                <Text size="2" as="span">
                  {address.phone}
                </Text>
              </Flex>
              <Flex gap="2" justify="between">
                <EditAddressForm
                  governorates={governorates}
                  translations={translations}
                  address={address}
                />
                <DeleteAddressButton
                  translations={translations}
                  address={address}
                />
              </Flex>
            </Flex>
          </Card>
        ))}
      </RadioGroup.Root>
    );
};

export default ShippingDetails;
