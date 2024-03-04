import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types/sharedTypes";
import { useTranslations } from "next-intl";
import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import {
  cartKeys,
  type cartTranslations,
} from "../../../../../messages/messagesKeys";
import { unstable_noStore as noStore } from "next/cache";

const CartList = dynamic(() => import("./CartList"));

type Props = {
  params: { locale: Locale };
};

const Page = ({ params: { locale } }: Props) => {
  noStore();
  unstable_setRequestLocale(locale);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations("cart");
  const translations = cartKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as cartTranslations);
  return (
    <Flex gap="4" direction={{ initial: "column", md: "row" }}>
      <CartList locale={locale} translations={translations} />
    </Flex>
  );
};

export default Page;
