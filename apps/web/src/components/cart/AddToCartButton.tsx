"use client";

import type { ProductSearchResponseElement } from "@/lib/types/product";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@radix-ui/themes";
import { toast } from "sonner";

type Props = {
  translation: string;
  product: ProductSearchResponseElement;
  quantity: number;
};

const AddToCartButton = ({ translation, product, quantity }: Props) => {
  const { addToCart } = useCart();

  return (
    <Button
      variant="outline"
      onClick={() =>
        +product.availableStock > 0
          ? addToCart({ product, quantity })
          : toast("Error Adding Product", {
              description: "Reason: out of stock",
              action: { label: "dismiss", onClick: () => toast.dismiss() },
              className: "group-[.toaster]:text-redA-9",
            })
      }
    >
      {translation}
    </Button>
  );
};

export default AddToCartButton;
