import { cachedGetGovrenorates } from "@/lib/services/server/GovernoratesServiceServer";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getUserAddresses } from "@/lib/services/server/profileServiceServer";
import { GovernoratesSchema } from "@/lib/types/city-governorate";
import { options } from "@/app/api/auth/[...nextauth]/authOtions";
import type { Locale, Session } from "@/lib/types/sharedTypes";
import { DataValidationError } from "@/lib/utils/exceptions";
import { unstable_noStore as noStore } from "next/cache";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { AddressesSchema } from "@/lib/types/address";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";
import { getServerSession } from "next-auth";
import OrderSummary from "./OrderSummary";
import { safeParse } from "valibot";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/Accordion/AccordionStyled";
import {
  checkoutKeys,
  type checkoutTranslations,
  profileKeys,
  type profileTranslations,
} from "../../../../../messages/messagesKeys";

type Props = { params: { locale: Locale } };

const Page = async ({ params: { locale } }: Props) => {
  noStore();
  unstable_setRequestLocale(locale);
  const session = await getServerSession(options);

  const [tCheckout, tProfile] = await Promise.all([
    getTranslations("checkout"),
    getTranslations("profile"),
  ]);

  const checkoutTranslations = checkoutKeys.reduce((obj, curr) => {
    obj[curr] = tCheckout(curr);
    return obj;
  }, {} as checkoutTranslations);

  const profileTranslations = profileKeys.reduce((obj, curr) => {
    obj[curr] = tProfile(curr);
    return obj;
  }, {} as profileTranslations);

  const translations = { ...checkoutTranslations, ...profileTranslations };

  const [addressResponse, governoratesData] = await Promise.all([
    getUserAddresses(session! as never as Session),
    cachedGetGovrenorates(),
  ]);

  const validatedGovernoratesData = safeParse(
    GovernoratesSchema,
    governoratesData
  );

  const validatedAddresses = safeParse(AddressesSchema, addressResponse);

  if (!validatedAddresses.success)
    throw new DataValidationError("User Addresses");

  if (!validatedGovernoratesData.success)
    throw new DataValidationError("Governorates");

  return (
    <Flex direction="row" width="100%" gap="4">
      <Flex direction="column" className="w-2/3">
        <AccordionRoot collapsible defaultValue="address" type="single">
          <AccordionItem value="address">
            <AccordionTrigger>{translations.shippingdetails}</AccordionTrigger>
            <AccordionContent>
              <ShippingDetails
                governorates={validatedGovernoratesData.output.data}
                addresses={validatedAddresses.output}
                translations={translations}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>{translations.paymentdetails}</AccordionTrigger>
            <AccordionContent>
              <PaymentDetails translations={translations} />
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </Flex>
      <Flex direction="column" className="w-1/3">
        <Card className="text-center">
          <Heading as="h3">{translations.ordersummary}</Heading>
          <OrderSummary translations={translations} />
        </Card>
      </Flex>
    </Flex>
  );
};

export default Page;
