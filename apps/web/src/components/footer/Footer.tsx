import { Flex, Text } from "@radix-ui/themes";
import { Facebook, Instagram } from "lucide-react";
import NextLink from "../NextLink";

const Footer = () => {
  return (
    <Flex
      className="shadow-1"
      direction={{ initial: "column", md: "row" }}
      justify={{ initial: "center", md: "between" }}
      align={{ initial: "center", md: "baseline" }}
      gap="4"
      py="4"
      px="6"
    >
      <Flex gap="4">
        <NextLink href="/about-us">
          <Text as="span">ABOUT US</Text>
        </NextLink>
        {/* <NextLink href="/contact-us">
          <Text as="span">CONTACT US</Text>
        </NextLink> */}
        <NextLink href="/privacy-policy">
          <Text as="span">PRIVACY POLICY</Text>
        </NextLink>
        <NextLink href="/terms-and-conditions">
          <Text as="span">TERMS AND CONDITIONS</Text>
        </NextLink>
        <NextLink href="/refund-return">
          <Text as="span">REFUND AND RETURN</Text>
        </NextLink>
      </Flex>
      <Flex justify="center" align="center" gap="2">
        <NextLink
          external
          href="https://www.facebook.com/Hanastorearts?mibextid=ZbWKwL"
        >
          <Facebook />
        </NextLink>
        <NextLink
          external
          href="https://www.instagram.com/hanaartsandcrafts?igsh=bHdlODdyeTRhM2t4"
        >
          <Instagram />
        </NextLink>
        <NextLink
          external
          href="https://www.tiktok.com/@hanaartsandcrafts?_t=8klR8CcvTjK&_r=1"
        >
          {/* <Tiktok /> */}
          TikTok
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Footer;
