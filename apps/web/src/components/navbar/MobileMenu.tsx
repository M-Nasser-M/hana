import type { navbarTranslations } from "../../../messages/messagesKeys";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { StyledContent, StyledOverlay } from "./StyledDialog";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, XCircle } from "lucide-react";
import NextLink from "../NextLink";
import { Box } from "@radix-ui/themes";

type Props = { translations: navbarTranslations };

const MobileMenu = ({ translations }: Props) => {
  return (
    <Box display={{ initial: "block", md: "none" }}>
      <Dialog.Root>
        <Dialog.Trigger>
          <Menu />
        </Dialog.Trigger>
        <StyledOverlay>
          <StyledContent slideFrom="left">
            <Dialog.Close className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
              <XCircle />
            </Dialog.Close>
            <Dialog.Title>Logo</Dialog.Title>
            <NavigationMenu.List className="ml-4 rtl:mr-4 mt-4 ">
              <NextLink href="/">
                <Dialog.Close asChild>
                  <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 py-1 px-2 rounded-3">
                    {translations.home}
                  </NavigationMenu.Item>
                </Dialog.Close>
              </NextLink>
              <NextLink href="/store">
                <Dialog.Close asChild>
                  <NavigationMenu.Item className=" active:bg-crimson-9 hover:bg-crimson-9 text-4 py-1 px-2 rounded-3">
                    {translations.store}
                  </NavigationMenu.Item>
                </Dialog.Close>
              </NextLink>
              <NextLink href="/blog">
                <Dialog.Close asChild>
                  <NavigationMenu.Item className=" active:bg-crimson-9 hover:bg-crimson-9 text-4 py-1 px-2 rounded-3">
                    {translations.blog}
                  </NavigationMenu.Item>
                </Dialog.Close>
              </NextLink>
            </NavigationMenu.List>
          </StyledContent>
        </StyledOverlay>
      </Dialog.Root>
    </Box>
  );
};

export default MobileMenu;
