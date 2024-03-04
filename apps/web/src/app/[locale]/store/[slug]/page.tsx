import { getProductUsingSlug } from "@/lib/services/server/ProductServiceServer";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { DataValidationError } from "@/lib/utils/exceptions";
import { unstable_noStore as noStore } from "next/cache";
import type { Locale } from "@/lib/types/sharedTypes";
import { ProductSchema } from "@/lib/types/product";
import { safeParse } from "valibot";
import Carousel from "./Carousel";

type Props = { params: { slug: string; locale: Locale } };

const Page = async ({ params: { slug, locale } }: Props) => {
  noStore();
  unstable_setRequestLocale(locale);
  const product = await getProductUsingSlug(slug);
  const validatedData = safeParse(ProductSchema, product);
  if (!validatedData.success) throw new DataValidationError(`Product ${slug}`);

  const t = await getTranslations("store");

  return (
    <Flex gap="4" justify="center" direction={{ initial: "column", md: "row" }}>
      <Carousel
        cover={validatedData.output.data.cover}
        images={validatedData.output.data.images}
      />

      <Flex p="4" direction="column" gap="4" className="md:w-1/3">
        <Heading className="col" size="7" color="crimson" highContrast>
          {validatedData.output.data.name}
        </Heading>
        <Heading size="7">{`${validatedData.output.data.price} ${t(
          "currency"
        )}`}</Heading>
        <Heading size="5">{validatedData.output.data.description}</Heading>
        <Flex direction="row" gap="2" justify="between">
          <Badge
            size="2"
            color={
              Number(validatedData.output.data.availableStock) > 0
                ? "green"
                : "red"
            }
          >
            {Number(validatedData.output.data.availableStock) > 0
              ? t("instock")
              : t("outofstock")}
          </Badge>
          <Text>{`${validatedData.output.data.availableStock} items remaining`}</Text>
        </Flex>
        <AddToCartButton
          translation={t("addtocart")}
          quantity={1}
          product={validatedData.output.data}
        />
        <Text
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: validatedData.output.data.details!,
          }}
          size="7"
          as="div"
        />
      </Flex>
    </Flex>
  );
};

export default Page;
