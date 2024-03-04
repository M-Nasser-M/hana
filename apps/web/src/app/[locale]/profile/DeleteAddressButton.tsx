import React from "react";
import type { profileTranslations } from "../../../../messages/messagesKeys";
import { toast } from "sonner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Trash2 } from "lucide-react";
import { deleteAddress } from "@/lib/services/client/ProfileServiceClinet";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { sessionAtom } from "@/lib/atoms/atoms";
import { AddressData } from "@/lib/types/address";

type Props = { translations: profileTranslations; address: AddressData };

const DeleteAddressButton = ({ translations, address }: Props) => {
  const session = useAtomValue(sessionAtom);
  const router = useRouter();

  const deletAction = async () => {
    const response = await deleteAddress(address.id, session!);
    if (!response) {
      toast("error deleting Address", {
        description: " pls try again later",
        action: {
          label: "dismiss",
          onClick: () => toast.dismiss(),
        },
      });
      return;
    }

    toast("Address deleted successfully", {
      action: {
        label: "dismiss",
        onClick: () => toast.dismiss(),
      },
    });

    router.refresh();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="cursor-pointer" size="1" variant="outline">
          {translations.delete}
          <Trash2 />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content size="4">
        <AlertDialog.Title>{translations.deleteaddress}</AlertDialog.Title>
        <AlertDialog.Description>
          {translations.deleteaddressconfirmation}
        </AlertDialog.Description>
        <Flex gap="2" justify="end">
          <AlertDialog.Action>
            <Button variant="surface" color="red" onClick={() => deletAction()}>
              {translations.delete}
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="surface" color="gray">
              {translations.cancel}
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteAddressButton;
