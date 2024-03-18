import { Governorates } from "@/lib/types/city-governorate";
import { serverApiAuth } from "./ServerApi";
import { cache } from "react";
import qs from "qs";

export async function getGovernorates() {
  const queryString = qs.stringify({ pagination: { pageSize: 30 } });
  const response = serverApiAuth.get<Governorates>(
    `/governorates?${queryString}`
  );
  return response;
}

export const cachedGetGovrenorates = cache(getGovernorates);
