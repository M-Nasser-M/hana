import type { localStorageCartItem } from "../types/cart";
import type { Session } from "@/lib/types/sharedTypes";
import { defaultPageSize } from "@/lib/types/product";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { GovernorateData } from "../types/city-governorate";

export const cartAtom = atomWithStorage<localStorageCartItem[]>("cart", []);

export const pageSizeAtom = atom<number>(defaultPageSize);

export const sessionAtom = atom<Session | null>(null);

export const governoratesAtom = atom<GovernorateData[]>([]);
