"use client";

import { type AddressForm, AddressFormSchema } from "@/lib/formSchemas/address";
import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import type { profileTranslations } from "../../../../messages/messagesKeys";
import { updateAddress } from "@/lib/services/client/ProfileServiceClinet";
import type { GovernorateData } from "@/lib/types/city-governorate";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { type AddressData } from "@/lib/types/address";
import { Controller, useForm } from "react-hook-form";
import { sessionAtom } from "@/lib/atoms/atoms";
import * as Form from "@radix-ui/react-form";
import { Edit, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

type Props = {
  translations: profileTranslations;
  address: AddressData;
  governorates: GovernorateData[];
};

const AddressForm = ({ translations, address, governorates }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const session = useAtomValue(sessionAtom);
  const locale = useGetLocalFromPathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    control,
  } = useForm<AddressForm>({
    resolver: valibotResolver(AddressFormSchema),
  });

  const onSubmit = async (data: AddressForm) => {
    const response = await updateAddress(address.id, data, session!);
    if (!response) {
      if (closeRef.current) closeRef.current.click();
      toast("error updating Address", {
        description: " pls try again later",
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }

    if (closeRef.current) closeRef.current.click();
    toast("Address updated successfully", {
      action: { label: "dismiss", onClick: () => toast.dismiss() },
    });
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="cursor-pointer" size="1" variant="outline">
          {translations.editaddress}
          <Edit />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative" size="4">
        <Dialog.Title color="crimson">{translations.editaddress}</Dialog.Title>
        <Dialog.Close ref={closeRef}>
          <Button
            className="absolute top-2 right-2  cursor-pointer"
            variant="soft"
          >
            <XCircle />
          </Button>
        </Dialog.Close>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="2" direction="column">
            <Text as="label" size="4" color="crimson">
              {translations.addressname}
            </Text>
            <TextField.Root
              defaultValue={address?.name ? address.name : ""}
              {...register("name")}
            />
            {errors.name && errors.name.message}

            <Text as="label" size="4" color="crimson">
              {translations.firstname}
            </Text>
            <TextField.Root
              defaultValue={address?.first_name ? address.first_name : ""}
              {...register("first_name")}
            />
            {errors.first_name && errors.first_name.message}

            <Text as="label" size="4" color="crimson">
              {translations.lastname}
            </Text>
            <TextField.Root
              defaultValue={address?.last_name ? address.last_name : ""}
              type="text"
              {...register("last_name")}
            />
            {errors.last_name && errors.last_name.message}

            <Text as="label" size="4" color="crimson">
              {translations.phone}
            </Text>
            <TextField.Root
              defaultValue={address?.phone ? address.phone : ""}
              type="text"
              {...register("phone")}
            />
            {errors.phone && errors.phone.message}

            <Text as="label" size="4" color="crimson">
              {translations.governorate}
            </Text>
            <Controller
              name="governorate"
              defaultValue={`${address?.governorate.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange} {...field}>
                  <Select.Trigger />
                  <Select.Content>
                    {governorates &&
                      governorates.length > 0 &&
                      governorates.map((governorate) => (
                        <Select.Item
                          key={governorate.id}
                          value={`${governorate.id}`}
                        >
                          {locale === "en"
                            ? governorate.governorate_name_en
                            : governorate.governorate_name_ar}
                        </Select.Item>
                      ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
            {errors.governorate && errors.governorate.message}

            <Text as="label" size="4" color="crimson">
              {translations.district}
            </Text>
            <TextField.Root
              defaultValue={address.district}
              type="text"
              {...register("district")}
            />
            {errors.district && errors.district.message}

            <Text as="label" size="4" color="crimson">
              {translations.street}
            </Text>
            <TextField.Root
              defaultValue={address?.street ? address.street : ""}
              {...register("street")}
              type="text"
            />
            {errors.street && errors.street.message}

            <Text as="label" size="4" color="crimson">
              {translations.building}
            </Text>
            <TextField.Root
              defaultValue={address?.building ? address.building : ""}
              {...register("building")}
              type="text"
            />
            {errors.building && errors.building.message}

            <Text as="label" size="4" color="crimson">
              {translations.floor}
            </Text>
            <TextField.Root
              defaultValue={address?.floor ? address.floor : ""}
              {...register("floor", { valueAsNumber: true })}
              type="text"
            />
            {errors.floor && errors.floor.message}

            <Text as="label" size="4" color="crimson">
              {translations.apartmentno}
            </Text>
            <TextField.Root
              defaultValue={address?.apartment_no ? address.apartment_no : ""}
              {...register("apartment_no")}
              type="text"
            />
            {errors.apartment_no && errors.apartment_no.message}

            <Text as="label" size="4" color="crimson">
              {translations.details}
            </Text>
            <TextArea
              defaultValue={address?.details ? address.details : ""}
              {...register("details")}
            />
            {errors.details && errors.details.message}

            <Button loading={isLoading} mt="4" type="submit" variant="outline">
              Submit
            </Button>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddressForm;
