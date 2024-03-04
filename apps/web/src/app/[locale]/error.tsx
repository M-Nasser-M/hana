"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Flex justify="center" align="center" direction="column" gap="4">
      <h2>{error.message}</h2>
      {error.message === "you need to login to access this page" ? (
        <Button size="4" asChild>
          <Link href="/api/auth/signin">signin</Link>
        </Button>
      ) : (
        <Button size="4" onClick={() => reset()}>
          Try again
        </Button>
      )}
    </Flex>
  );
}
