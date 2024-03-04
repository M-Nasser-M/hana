import { unstable_setRequestLocale } from "next-intl/server";
import { DataValidationError } from "@/lib/utils/exceptions";
import { getBlogPage } from "@/lib/services/server/BlogServiceServer";
import { Locale } from "@/lib/types/sharedTypes";
import NextLink from "@/components/NextLink";
import { blogsSchema } from "@/lib/types/blog";
import { safeParse } from "valibot";
import { locales } from "@/i18n";

import {
  AspectRatio,
  Card,
  Grid,
  Heading,
  Inset,
  Link,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
type Props = { params: { locale: Locale }; searchParams: { page?: number } };

const Page = async ({ params: { locale }, searchParams: { page } }: Props) => {
  const blogsPage = await getBlogPage(locale, page);

  const validatedData = safeParse(blogsSchema, blogsPage);

  if (!validatedData.success) throw new DataValidationError("blog");

  unstable_setRequestLocale(locale);

  return (
    <Grid
      columns={{ initial: "1", md: "2", lg: "3" }}
      mb="9"
      gap="3"
      width="100%"
    >
      {validatedData.output.data.map((blog) => (
        <Card className="h-full" key={blog.id}>
          <Inset clip="padding-box" side="top" pb="current">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt={blog.cover?.alternativeText || ""}
                fill
                src={blog.cover?.url || ""}
              />
            </AspectRatio>
          </Inset>
          <Link asChild>
            <NextLink href={`/blog/${blog.slug}`}>
              <Heading as="h3">{blog.title}</Heading>
            </NextLink>
          </Link>
          <Text as="p">{blog.description}</Text>
        </Card>
      ))}
    </Grid>
  );
};

export default Page;
