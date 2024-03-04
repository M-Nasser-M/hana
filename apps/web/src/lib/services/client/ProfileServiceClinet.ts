import type { Email, Phone, Session } from "@/lib/types/sharedTypes";
import { clientApi } from "./ClientApi";
import type { AddressForm, UpdateAddressForm } from "@/lib/formSchemas/address";
import type { Address } from "@/lib/types/address";

export async function updateEmail(email: Email, session: Session) {
  try {
    const response = await clientApi.put(
      `/users/${session.user.id}`,
      {
        primaryEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
}

export async function updatePhone(phone: Phone, session: Session) {
  try {
    const response = await clientApi.put(
      `/users/${session.user.id}`,
      {
        phone: phone,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
}

export async function addAddress(address: AddressForm, session: Session) {
  try {
    const response = await clientApi.post<Address>(
      "/addresses",
      {
        ...address,
        users_permissions_user: session.user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
}

export async function updateAddress(
  addressId: number,
  address: UpdateAddressForm,
  session: Session
) {
  try {
    const response = await clientApi.put<Address>(
      `/addresses/${addressId}`,
      address,
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
}

export async function deleteAddress(addressId: number, session: Session) {
  try {
    const response = await clientApi.delete<Address>(
      `/addresses/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
}
