"use client";
import type { navbarTranslations } from "../../../messages/messagesKeys";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Box, Button, Flex } from "@radix-ui/themes";
import { Session } from "@/lib/types/sharedTypes";
import { sessionAtom } from "@/lib/atoms/atoms";
import ProfileDropdown from "./ProfileDropdown";
import { useHydrateAtoms } from "jotai/utils";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileMenu from "./MobileMenu";
import NextLink from "../NextLink";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const CartButton = dynamic(() => import("./CartButton"));
const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"));

type Props = {
  session: Session | null;
  translations: navbarTranslations;
};

const Navbar = ({ session, translations }: Props) => {
  useHydrateAtoms([[sessionAtom, session]]);

  return (
    <Flex className="shadow-1" justify="between" gap="4" py="4" px="6" mb="6">
      <NavigationMenu.Root>
        <Box display={{ initial: "none", md: "block" }}>
          <NavigationMenu.List className="text-4">
            <Flex>
              <NextLink href="/">
                <Image
                  src="/logo-accent-crop.png"
                  alt="hana logo"
                  width={64}
                  height={32}
                />
              </NextLink>
              <NextLink href="/">
                <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 py-1 px-2 rounded-3">
                  {translations.home}
                </NavigationMenu.Item>
              </NextLink>
              <NextLink href="/store">
                <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 py-1 px-2 rounded-3">
                  {translations.store}
                </NavigationMenu.Item>
              </NextLink>
              <NextLink href="/blog">
                <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 py-1 px-2 rounded-3">
                  {translations.blog}
                </NavigationMenu.Item>
              </NextLink>
            </Flex>
          </NavigationMenu.List>
        </Box>
        <MobileMenu translations={translations} />
      </NavigationMenu.Root>
      <Flex gap="2">
        <CartButton />
        <ThemeSwitcher />
        <LanguageSwitcher />
        {session ? (
          <ProfileDropdown
            profile={translations.profile}
            signout={translations.signout}
          />
        ) : (
          <Button asChild>
            <Link href="/api/auth/signin">{translations.signin}</Link>
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
