"use client";

import type { profileTranslations } from "../../../../messages/messagesKeys";
import { updateEmail } from "@/lib/services/client/ProfileServiceClinet";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { EmailSchema } from "@/lib/types/sharedTypes";
import { sessionAtom } from "@/lib/atoms/atoms";
import { Edit, XCircle } from "lucide-react";
import * as Form from "@radix-ui/react-form";
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

const EmailFormSchema = object({ email: EmailSchema });
type EmailForm = Output<typeof EmailFormSchema>;

const EditUserEmailForm = ({ translations }: Props) => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: valibotResolver(EmailFormSchema),
  });

  const session = useAtomValue(sessionAtom);

  const onSubmit = async (data: EmailForm) => {
    const res = await updateEmail(data.email, session!);
    if (!res) {
      if (closeRef.current) closeRef.current.click();
      toast("error updating your email pls try again later");
      return;
    }
    if (closeRef.current) closeRef.current.click();
    toast("email updated successfully");
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
              {translations.email}
            </Text>
            <TextFieldInput {...register("email")} type="email" />
            {errors.email && errors.email.message}
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditUserEmailForm;
