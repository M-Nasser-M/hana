"use client";

import { type AddressForm, AddressFormSchema } from "@/lib/formSchemas/address";
import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import type { profileTranslations } from "../../../../messages/messagesKeys";
import { addAddress } from "@/lib/services/client/ProfileServiceClinet";
import type { GovernorateData } from "@/lib/types/city-governorate";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Loader2, Plus, XCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { sessionAtom } from "@/lib/atoms/atoms";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import { useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";

type Props = {
  translations: profileTranslations;
  governorates: GovernorateData[];
  big?: boolean;
};

const AddAddressForm = ({ translations, governorates, big }: Props) => {
  const session = useAtomValue(sessionAtom);
  const locale = useGetLocalFromPathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<AddressForm>({
    resolver: valibotResolver(AddressFormSchema),
  });

  const onSubmit = async (data: AddressForm) => {
    const response = await addAddress(data, session!);
    if (!response) {
      if (closeRef.current) closeRef.current.click();
      toast("error Adding Address", {
        description: " pls try again later",
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }

    if (closeRef.current) closeRef.current.click();
    toast("Address Added successfully", {
      action: { label: "dismiss", onClick: () => toast.dismiss() },
    });
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Box>
          <Button
            className="cursor-pointer"
            size={big ? "4" : "1"}
            variant="outline"
          >
            {translations.addaddress}
            <Plus />
          </Button>
        </Box>
      </Dialog.Trigger>
      <Dialog.Content className="relative" size="4">
        <Dialog.Title color="crimson">{translations.addaddress}</Dialog.Title>
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
            <TextFieldInput {...register("name")} />
            {errors.name && errors.name.message}

            <Text as="label" size="4" color="crimson">
              {translations.firstname}
            </Text>
            <TextFieldInput {...register("first_name")} />
            {errors.first_name && errors.first_name.message}

            <Text as="label" size="4" color="crimson">
              {translations.lastname}
            </Text>
            <TextFieldInput type="text" {...register("last_name")} />
            {errors.last_name && errors.last_name.message}

            <Text as="label" size="4" color="crimson">
              {translations.phone}
            </Text>
            <TextFieldInput type="text" {...register("phone")} />
            {errors.phone && errors.phone.message}

            <Text as="label" size="4" color="crimson">
              {translations.governorate}
            </Text>
            <Controller
              name="governorate"
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
            <TextFieldInput type="text" {...register("district")} />
            {errors.district && errors.district.message}

            <Text as="label" size="4" color="crimson">
              {translations.street}
            </Text>
            <TextFieldInput {...register("street")} type="text" />
            {errors.street && errors.street.message}

            <Text as="label" size="4" color="crimson">
              {translations.building}
            </Text>
            <TextFieldInput {...register("building")} type="text" />
            {errors.building && errors.building.message}

            <Text as="label" size="4" color="crimson">
              {translations.floor}
            </Text>
            <TextFieldInput
              {...register("floor", { valueAsNumber: true })}
              type="text"
            />
            {errors.floor && errors.floor.message}

            <Text as="label" size="4" color="crimson">
              {translations.apartmentno}
            </Text>
            <TextFieldInput {...register("apartment_no")} type="text" />
            {errors.apartment_no && errors.apartment_no.message}

            <Text as="label" size="4" color="crimson">
              {translations.details}
            </Text>
            <TextArea {...register("details")} />
            {errors.details && errors.details.message}

            <Button mt="4" type="submit" variant="outline">
              {!isSubmitting && "Save"}
              {isSubmitting && <Loader2 className="animate-spin" />}
            </Button>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddAddressForm;
