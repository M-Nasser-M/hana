"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-panel-translucent group-[.toaster]:text-accent-12",
          actionButton:
            "group-[.toast]:bg-crimson-9 group-[.toast]:text-accent-9-contrast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
