import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";

export const handleAddClientParamsRoute = (
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  pathname: string,
  paramName: string,
  paramValue: string | null
) => {
  const params = new URLSearchParams(searchParams);
  if (paramValue !== null && paramValue.length > 0)
    params.set(paramName, paramValue);
  else params.delete(paramName);
  router.push(`${pathname}?${params.toString()}`);
};
