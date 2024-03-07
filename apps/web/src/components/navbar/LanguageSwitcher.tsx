"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/types/sharedTypes";
import { Select } from "@radix-ui/themes";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (newLocale: Locale) => {
    if (
      !currentPathname.includes("store/") &&
      !currentPathname.includes("blog/")
    ) {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );

      router.refresh();
      return;
    }

    if (newLocale !== "en") {
      router.push(
        `${currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)}-${newLocale}`
      );
      router.refresh();
      return;
    }

    router.push(
      currentPathname
        .replace(`/${currentLocale}`, `/${newLocale}`)
        .slice(0, currentLocale.length * -1 - 1)
    );
    router.refresh();
    return;
  };

  return (
    <Select.Root value={currentLocale} onValueChange={handleChange}>
      <Select.Trigger placeholder="Select Lang" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Language</Select.Label>
          <Select.Item value="en">English</Select.Item>
          <Select.Item value="ar">Arabic</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
