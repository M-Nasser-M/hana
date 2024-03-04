import type { Session } from "@/lib/types/sharedTypes";
import { serverApiAuth } from "./ServerApi";
import qs from "qs";
import type { Addresses } from "@/lib/types/address";
import { UserProfile } from "@/lib/types/userProfile";

export async function getUserProfile(id: number) {
  const queryString = qs.stringify({
    populate: {
      addresses: { populate: "governorate" },
      orders: true,
      cart: { populate: { cart_items: { poulate: "product" } } },
    },
  });

  try {
    const response = await serverApiAuth.get<UserProfile>(
      `/users/${id}?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error fetching data"
    );

    return null;
  }
}

export async function getUserAddresses(session: Session) {
  const queryString = qs.stringify({
    populate: ["governorate"],
    filters: { users_permissions_user: session.user.id },
  });

  try {
    const response = await serverApiAuth.get<Addresses>(
      `/addresses?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error fetching data"
    );

    return null;
  }
}
