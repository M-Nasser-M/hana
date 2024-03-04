"use client";

import { updatePhone } from "@/lib/services/client/ProfileServiceClinet";
import type { profileTranslations } from "../../../../messages/messagesKeys";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { PhoneSchema } from "@/lib/types/sharedTypes";
import { sessionAtom } from "@/lib/atoms/atoms";
import * as Form from "@radix-ui/react-form";
import { Edit, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Output, object } from "valibot";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";

type Props = { translations: profileTranslations };

const PhoneFormSchema = object({ phone: PhoneSchema });
type PhoneForm = Output<typeof PhoneFormSchema>;

const EditUserPhoneForm = ({ translations }: Props) => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneForm>({
    resolver: valibotResolver(PhoneFormSchema),
  });

  const session = useAtomValue(sessionAtom);

  const onSubmit = async (data: PhoneForm) => {
    const response = await updatePhone(data.phone, session!);
    if (!response) {
      if (closeRef.current) closeRef.current.click();
      toast("error updating your phone", {
        description: " pls try again later",
        action: { label: "dismiss", onClick: () => toast.dismiss() },
      });
      return;
    }

    if (closeRef.current) closeRef.current.click();
    toast("phone updated successfully", {
      action: { label: "dismiss", onClick: () => toast.dismiss() },
    });
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton className="cursor-pointer" variant="ghost">
          <Edit />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content size="4" className="relative">
        <Dialog.Title color="crimson">{translations.edituserinfo}</Dialog.Title>
        <Dialog.Close ref={closeRef}>
          <Button
            className="absolute top-2 right-2  cursor-pointer"
            variant="soft"
          >
            <XCircle />
          </Button>
        </Dialog.Close>
        <Form.Root color="red" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="2">
            <Text as="label" size="4" color="crimson">
              {translations.phone}
            </Text>
            <TextFieldInput {...register("phone")} />
            {errors.phone && errors.phone.message}
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditUserPhoneForm;
