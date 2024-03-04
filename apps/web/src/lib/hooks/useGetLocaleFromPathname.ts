import { Locale } from "@/lib/types/sharedTypes";
import { usePathname } from "next/navigation";

export function useGetLocalFromPathname(): Locale {
  const pathname = usePathname();
  return pathname?.split("/")[1] as Locale;
}
