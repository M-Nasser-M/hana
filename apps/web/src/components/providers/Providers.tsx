"use client";

import { type Direction, DirectionProvider } from "@radix-ui/react-direction";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";

type Props = { children: ReactNode; dir: Direction };

const Providers = ({ children, dir }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme appearance="inherit" accentColor="crimson" grayColor="slate">
        <DirectionProvider dir={dir}>
          <JotaiProvider>{children}</JotaiProvider>
        </DirectionProvider>
      </Theme>
    </ThemeProvider>
  );
};

export default Providers;
