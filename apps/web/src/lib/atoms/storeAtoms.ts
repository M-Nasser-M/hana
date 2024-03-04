import { changeFilterCheckPure } from "@/lib/utils/utils";
import atomWithDebounce from "./atomWithDebounce";
import { atom } from "jotai";
import type {
  FilterableFields,
  ProductSearchResponse,
} from "@/lib/types/product";
import {
  SubCategory,
  filterDefaultCheckStatus,
  Category,
} from "@/lib/types/product";

export const storeProductListAtom = atom<ProductSearchResponse | null>(null);

export const storeSearchQueryAtom = atomWithDebounce<string>("");

export const storeSortAtom = atom<string | null>(null);

export const readStoreSortAtom = atom<string[] | []>((get) => {
  const currentStoreSortValue = get(storeSortAtom);
  return currentStoreSortValue === null ? [] : [currentStoreSortValue];
});

export const storeNumberOfPagesAtom = atom<number>(0);

export const currentStorePageAtom = atom<number>(1);

export const storeActiveFilterAtom = atom<FilterableFields[]>([]);

export const storeSelectedFiltersAtom = atom(filterDefaultCheckStatus);

export const writeStoreSelectedFiltersAtom = atom(
  null,
  (get, set, values: string[]) => {
    for (const value of values) {
      const filter = value.match(/'([^']+)'/);
      if (
        filter &&
        [...Object.values(Category), ...Object.values(SubCategory)].includes(
          filter[1] as Category | SubCategory
        )
      ) {
        set(
          storeSelectedFiltersAtom,
          changeFilterCheckPure(
            get(storeSelectedFiltersAtom),
            filter ? (filter[1] as Category | SubCategory) : null,
            true
          )
        );
      }
    }
  }
);
