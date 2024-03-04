"use client";
import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import { Link as RadixLink } from "@radix-ui/themes";
import type { ReactNode } from "react";
import Link from "next/link";

type Props = { children: ReactNode; href: string; className?: string };

const NextLink = ({ children, href, className }: Props) => {
  const locale = useGetLocalFromPathname();
  return (
    <RadixLink asChild>
      <Link className={className} href={`/${locale}${href}`}>
        {children}
      </Link>
    </RadixLink>
  );
};

export default NextLink;
