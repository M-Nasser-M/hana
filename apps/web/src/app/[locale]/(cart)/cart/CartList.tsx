"use client";
import type { cartTranslations } from "../../../../../messages/messagesKeys";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Locale } from "@/lib/types/sharedTypes";
import { sessionAtom } from "@/lib/atoms/atoms";
import { arrayRange } from "@/lib/utils/utils";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import Image from "next/image";
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Separator,
  Text,
} from "@radix-ui/themes";

type Props = { translations: cartTranslations; locale: Locale };

const CartList = ({ translations, locale }: Props) => {
  const session = useAtomValue(sessionAtom);
  const router = useRouter();

  const { cartValue, removeFromCart, changeQuantity, cartTotal } = useCart();

  const handleGoToCheckout = () => {
    if (!session) {
      toast(translations.notloggedin, {
        description: translations.pleaselogintoproceedwithyourorder,
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }
    if (session) {
      router.push(`/${locale}/checkout`);
      return;
    }
  };

  const [parent] = useAutoAnimate();

  if (cartValue && cartValue.length > 0)
    return (
      <>
        <Flex className="md:w-2/3">
          <Flex ref={parent} width="100%" gap="4" direction="column">
            {cartValue.map((item) => {
              return (
                <Card key={item.product.id}>
                  <Flex width="100%" direction="row" gap="4">
                    <Image
                      src={item.product.cover.formats.thumbnail?.url || ""}
                      alt={item.product.cover.alternativeText || ""}
                      width={item.product.cover.formats.thumbnail?.width || 0}
                      height={item.product.cover.formats.thumbnail?.height || 0}
                    />
                    <Flex direction="column" gap="4">
                      <Heading color="crimson" as="h1">
                        {item.product.name}
                      </Heading>
                      <Text>{item.product.description}</Text>
                      <Text>{item.product.price} L.E</Text>
                      <Flex direction="row" gap="4">
                        <Select.Root
                          onValueChange={(val) => {
                            changeQuantity(item.product.id, Number(val));
                          }}
                          defaultValue={String(item.quantity)}
                        >
                          <Select.Trigger />
                          <Select.Content position="popper">
                            {arrayRange(
                              1,
                              Number(item.product.availableStock),
                              1
                            ).map((val) => (
                              <Select.Item key={val} value={String(val)}>
                                {val}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                        <Button onClick={() => removeFromCart(item.product.id)}>
                          {translations.remove}
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
          </Flex>
        </Flex>
        <Card className="h-fit md:w-1/3">
          <Flex direction="column" gap="4" justify="center">
            {cartValue.map((item) => {
              return (
                <Flex key={item.product.id} direction="column" gap="4">
                  <Flex direction="row" justify="between" gap="4">
                    <Text as="label">{translations.name}:</Text>
                    <Text>{item.product.name}</Text>
                  </Flex>
                  <Flex direction="row" justify="between" gap="4">
                    <Text as="label">{translations.quantity}:</Text>
                    <Text>{item.quantity}</Text>
                  </Flex>
                  <Flex direction="row" justify="between" gap="4">
                    <Text as="label">{translations.price}:</Text>
                    <Text>{item.product.price * item.quantity} L.E</Text>
                  </Flex>
                  <Separator className="w-full" />
                </Flex>
              );
            })}
            <Flex direction="row" justify="between" gap="4">
              <Text as="label">{translations.total}:</Text>
              <Text>{cartTotal} L.E</Text>
            </Flex>
            <Button onClick={handleGoToCheckout}>
              {translations.proceedtocheckout}
            </Button>
          </Flex>
        </Card>
      </>
    );

  return (
    <Flex justify="center" align="center">
      <Heading color="crimson" as="h1">
        {translations.cartempty}
      </Heading>
    </Flex>
  );
};

export default CartList;
