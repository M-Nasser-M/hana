import { unstable_setRequestLocale } from "next-intl/server";
import { MainPageDataSchema } from "@/lib/types/mainPages";
import { getHomeData } from "@/lib/services/server/HomeServiceServer";
import type { Locale } from "@/lib/types/sharedTypes";
import { AspectRatio, Card, Flex, Heading, Inset } from "@radix-ui/themes";
import { parse, safeParse } from "valibot";
import { Metadata } from "next";
import NextImage from "next/image";
import { getCategoriesData } from "@/lib/services/server/CategoryService";
import { getFeaturedProducts } from "@/lib/services/server/ProductServiceServer";
import { CategoriesSchema } from "@/lib/types/categories";
import CarouselHorizontal from "../../components/carousel/CarouselHorizontal";
import {
  type ProductSearchResponseElement,
  ProductSearchResponseSchema,
} from "@/lib/types/product";
import NextLink from "@/components/NextLink";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const homeData = await getHomeData(params.locale);

  const { seo } = parse(MainPageDataSchema, homeData?.data);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.metaRobots,
  };
}

export default async function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const [catResponse, featuredResponse] = await Promise.all([
    getCategoriesData(),
    getFeaturedProducts(),
  ]);

  const [validatedCat, validatedFeatured] = [
    safeParse(CategoriesSchema, catResponse),
    safeParse(ProductSearchResponseSchema, featuredResponse),
  ];

  if (!validatedCat.success || !validatedFeatured.success) return null;

  const Products: ProductSearchResponseElement[] =
    validatedFeatured.output.hits.filter(
      (product) => Number(product.availableStock) > 0
    );

  return (
    <Flex direction="column" gap="4">
      <Heading
        className="text-crimsonA-9 animate-bounce"
        weight="bold"
        size="9"
        align="center"
        mb="4"
        as="h1"
      >
        Hana Store
      </Heading>
      <Flex px="4" gap="4" wrap="wrap" justify="center" align="center">
        {validatedCat.output.data.map((category) => (
          <Card asChild key={category.id}>
            <Flex
              className="md:w-1/4 sm:w-1/3 w-full text-center"
              gap="4"
              direction="column"
              align="center"
              justify="center"
            >
              {category.cover && (
                <NextLink
                  href={`/store?filter=["locale = ${locale}","categories.name_en = '${category.name_en}'"]`}
                >
                  <Inset mb="4">
                    <AspectRatio ratio={4 / 3}>
                      <NextImage
                        fill
                        src={category.cover.url}
                        alt={category.cover.alternativeText || "category image"}
                      />
                    </AspectRatio>
                  </Inset>
                </NextLink>
              )}
              <NextLink
                href={`/store?filter=["locale = ${locale}","categories.name_en = '${category.name_en}'"]`}
              >
                <Heading as="h3">{category[`name_${locale}`]}</Heading>
              </NextLink>
            </Flex>
          </Card>
        ))}
      </Flex>
      <Heading className="ml-4 rtl:mr-4" as="h2">
        Featured Products
      </Heading>
      <CarouselHorizontal products={Products} />
    </Flex>
  );
}
