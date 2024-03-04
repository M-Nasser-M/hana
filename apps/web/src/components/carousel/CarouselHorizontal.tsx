"use client";
import type { ProductSearchResponseElement } from "@/lib/types/product";
import { ReactNode, useCallback, useRef, useState } from "react";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NextImage from "next/image";
import Glider from "react-glider";

import "glider-js/glider.min.css";
import NextLink from "../NextLink";

type Props = { products: ProductSearchResponseElement[] };

const GliderContainer = ({ children }: { children: ReactNode }) => {
  return <Box className="glider-contain mx-auto p-4">{children}</Box>;
};

const CarouselHorizontal = ({ products }: Props) => {
  const previousButton = useRef<HTMLButtonElement | null>(null);
  const nextButton = useRef<HTMLButtonElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const previousButtonCallbackRef = useCallback(
    (element: HTMLButtonElement | null) => {
      previousButton.current = element;
      setIsReady(Boolean(previousButton.current && nextButton.current));
    },
    []
  );

  const nextButtonCallbackRef = useCallback(
    (element: HTMLButtonElement | null) => {
      nextButton.current = element;
      setIsReady(Boolean(previousButton.current && nextButton.current));
    },
    []
  );
  return (
    <Box p="0" m="0" position="relative">
      {isReady && (
        <Glider
          className="glider"
          containerElement={GliderContainer}
          slidesToShow="auto"
          slidesToScroll={1}
          hasArrows
          hasDots
          arrows={{ next: nextButton.current, prev: previousButton.current }}
          responsive={[
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 0, settings: { slidesToShow: 1 } },
          ]}
          skipTrack
        >
          <Box className="glider-track gap-2">
            {products.map((product) => (
              <Flex key={product.id} position="relative">
                <NextImage
                  src={product.cover.formats?.small?.url || ""}
                  alt={product.cover.alternativeText || ""}
                  height={product.cover.formats?.small?.height || 0}
                  width={product.cover.formats?.small?.width || 0}
                  placeholder="blur"
                  blurDataURL={product.cover.placeholder}
                />

                <Box
                  position="absolute"
                  className="bg-panel-translucent w-full bottom-0 left-0"
                >
                  <NextLink href={`/store/${product.slug}`}>
                    <Text as="p" size="4" weight="bold" align="center">
                      {product.name}
                    </Text>
                    <Text as="p" size="4" align="center">
                      {product.offer_price
                        ? product.offer_price
                        : product.price}{" "}
                      L.E
                    </Text>
                  </NextLink>
                </Box>
              </Flex>
            ))}
          </Box>
        </Glider>
      )}
      <Button
        ref={previousButtonCallbackRef}
        variant="ghost"
        className="absolute top-[50%] left-6"
        aria-label="Previous"
      >
        <ChevronLeft size={48} />
      </Button>
      <Button
        ref={nextButtonCallbackRef}
        variant="ghost"
        className="absolute top-[50%] right-6"
        aria-label="next"
      >
        <ChevronRight size={48} />
      </Button>
    </Box>
  );
};

export default CarouselHorizontal;
