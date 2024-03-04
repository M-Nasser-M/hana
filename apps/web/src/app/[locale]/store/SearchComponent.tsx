"use client";
import type { storeTranslations } from "../../../../messages/messagesKeys";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleAddClientParamsRoute } from "@/lib/utils/handleClientParams";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Pagination from "@/components/pagination/Pagination";
import type {
  FilterableFields,
  ProductSearchResponse,
} from "@/lib/types/product";
import { useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import NextLink from "@/components/NextLink";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  AspectRatio,
  Badge,
  Card,
  Flex,
  Grid,
  Heading,
  Inset,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  currentStorePageAtom,
  storeActiveFilterAtom,
  storeNumberOfPagesAtom,
  storeProductListAtom,
  storeSearchQueryAtom,
  storeSortAtom,
  writeStoreSelectedFiltersAtom,
} from "@/lib/atoms/storeAtoms";

const FilterSort = dynamic(() => import("./FilterSort"));

type Props = {
  products: ProductSearchResponse;
  filter: FilterableFields[];
  sort: string | null;
  searchQuery: string;
  page: number;
  numberOfpages: number;
  translations: storeTranslations;
};

const SearchComponent = (props: Props) => {
  useHydrateAtoms([
    [storeSearchQueryAtom.debouncedValueAtom, props.searchQuery],
    [storeNumberOfPagesAtom, props.numberOfpages],
    [storeProductListAtom, props.products],
    [currentStorePageAtom, props.page],
    [storeActiveFilterAtom, props.filter],
    [storeSortAtom, props.sort],
    [writeStoreSelectedFiltersAtom, props.filter],
  ]);

  const setSearchQuery = useSetAtom(storeSearchQueryAtom.debouncedValueAtom);
  const setCurrentPage = useSetAtom(currentStorePageAtom);
  const productList = useAtomValue(storeProductListAtom);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [parent] = useAutoAnimate();

  return (
    <>
      <TextField.Root mb="9">
        <TextField.Slot>
          <Search height="16" />
        </TextField.Slot>
        <TextField.Input
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleAddClientParamsRoute(
              searchParams,
              router,
              pathname,
              "searchquery",
              e.target.value
            );
          }}
          placeholder="Search our store"
        />
      </TextField.Root>

      <FilterSort />

      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="3"
        mb="4"
        width="100%"
        px={{ initial: "4", md: "2", lg: "0" }}
        ref={parent}
      >
        {productList?.hits.map((product) => (
          <Card key={product.slug}>
            <Inset clip="padding-box" side="top" pb="current">
              <AspectRatio ratio={16 / 9}>
                <Image
                  alt={product.cover?.alternativeText || ""}
                  fill
                  src={product.cover?.url || ""}
                />
              </AspectRatio>
            </Inset>
            <NextLink href={`/store/${product.slug}`}>
              <Heading size="6" as="h3">
                {product.name}
              </Heading>
            </NextLink>
            <Text size="4" as="p">
              {product.description}
            </Text>
            <Badge
              size="2"
              my="2"
              color={Number(product.availableStock) > 0 ? "green" : "red"}
            >
              {Number(product.availableStock) > 0
                ? props.translations.instock
                : props.translations.outofstock}
            </Badge>
            <Flex justify="between">
              <Heading as="h3">
                {product.offer_price ? product.offer_price : product.price}{" "}
                {props.translations.currency}
              </Heading>
              <AddToCartButton
                translation={props.translations.addtocart}
                product={product}
                quantity={1}
              />
            </Flex>
          </Card>
        ))}
      </Grid>
      {props.numberOfpages > 1 && (
        <Pagination
          handleNavigation={(pageNo) => {
            setCurrentPage(pageNo);
            handleAddClientParamsRoute(
              searchParams,
              router,
              pathname,
              "page",
              String(pageNo)
            );
          }}
          numberOfPages={props.numberOfpages}
        />
      )}
    </>
  );
};

export default SearchComponent;
