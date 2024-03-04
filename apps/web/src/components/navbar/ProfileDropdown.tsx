"use client";
import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";
import { sessionAtom } from "@/lib/atoms/atoms";
import { signOut } from "next-auth/react";
import { useAtomValue } from "jotai";
import NextLink from "../NextLink";

type Props = {
  profile: string;
  signout: string;
};

const ProfileDropdown = ({ profile, signout }: Props) => {
  const session = useAtomValue(sessionAtom);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box>
          <Avatar radius="full" fallback={`${session?.user.name[0]}`} />
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>
          <NextLink href="/profile">{profile}</NextLink>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Button
            variant="ghost"
            onClick={() => {
              signOut();
            }}
          >
            {signout}
          </Button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
