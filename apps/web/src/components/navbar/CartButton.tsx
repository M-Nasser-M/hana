"use client";
import { ShoppingCart, Trash2 } from "lucide-react";
import NextLink from "../NextLink";
import Image from "next/image";
import { useCart } from "@/lib/hooks/useCart";
import {
  Button,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  ScrollArea,
  Strong,
  Text,
} from "@radix-ui/themes";

const CartButton = () => {
  const { cartValue, removeFromCart } = useCart();

  return (
    <HoverCard.Root>
      <NextLink href="/cart">
        <HoverCard.Trigger>
          <Button size="2" mr="2" variant="outline">
            <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </HoverCard.Trigger>
      </NextLink>
      <HoverCard.Content>
        {cartValue.length === 0 ? (
          <Heading align="center" my="4" as="h2">
            Cart is Empty
          </Heading>
        ) : (
          <>
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              my="4"
              style={{ maxHeight: "40vh" }}
            >
              {cartValue.map((item) => (
                <Flex
                  key={item.product.id}
                  my="4"
                  direction="row"
                  align="center"
                  gap="2"
                  width="100%"
                >
                  <Image
                    src={item.product.cover.formats.thumbnail?.url || ""}
                    height={item.product.cover.formats.thumbnail?.height || 0}
                    width={item.product.cover.formats.thumbnail?.width || 0}
                    alt={item.product.cover.alternativeText || ""}
                  />
                  <Flex direction="column" gap="2">
                    <Text>
                      <Strong>
                        L.E{" "}
                        {item.product.offer_price
                          ? item.product.offer_price
                          : item.product.price}
                      </Strong>
                    </Text>
                    <Text size="1" weight="light">
                      {item.product.name}
                    </Text>
                    <IconButton onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 />
                    </IconButton>
                  </Flex>
                </Flex>
              ))}
            </ScrollArea>
            <NextLink href="/cart">
              <Button className="w-full">View Cart And Checkout</Button>
            </NextLink>
          </>
        )}
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default CartButton;
