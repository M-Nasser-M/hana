"use client";
import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import { Link as RadixLink } from "@radix-ui/themes";
import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
};

const NextLink = ({ children, href, className, external = false }: Props) => {
  const locale = useGetLocalFromPathname();
  const fullHref = href.startsWith("https") ? href : `/${locale}${href}`;
  return (
    <RadixLink asChild>
      <Link
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
        href={fullHref}
      >
        {children}
      </Link>
    </RadixLink>
  );
};

export default NextLink;
