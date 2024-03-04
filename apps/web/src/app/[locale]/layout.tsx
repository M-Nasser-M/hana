import { navbarKeys, navbarTranslations } from "../../../messages/messagesKeys";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Locale, SessionSchema } from "@/lib/types/sharedTypes";
import { options } from "../api/auth/[...nextauth]/authOtions";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/navbar/Navbar";
import { Container } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { notFound } from "next/navigation";
import { safeParse } from "valibot";
import { ReactNode } from "react";
import { locales } from "@/i18n";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale }));
}

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!locales.includes(locale)) notFound();

  unstable_setRequestLocale(locale);

  const session = await getServerSession(options);
  const t = await getTranslations("navbar");
  const translations = navbarKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as navbarTranslations);

  const validatedSession = safeParse(SessionSchema, session);

  const dir = locale == "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers dir={dir}>
          <Navbar
            session={validatedSession.success ? validatedSession.output : null}
            translations={translations}
          />
          <Container size="4" mb="9">
            {children}
            <Toaster />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
