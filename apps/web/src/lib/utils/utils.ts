import type { FilterableFields } from "@/lib/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const changeFilterCheckPure = (
  storeSelectedFilters: Record<
    string,
    {
      checked: boolean;
      filter: FilterableFields;
    }
  >,
  filter: string | null,
  checked: boolean
) => {
  if (filter === null) return storeSelectedFilters;

  return {
    ...storeSelectedFilters,
    [filter]: { ...storeSelectedFilters[filter], checked },
  };
};

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
