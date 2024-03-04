import { AspectRatio, Flex, Heading } from "@radix-ui/themes";
import { getBlogPostUsingSlug } from "@/lib/services/server/BlogServiceServer";
import { blogSchema } from "@/lib/types/blog";
import { safeParse } from "valibot";
import Image from "next/image";

import { DataValidationError } from "@/lib/utils/exceptions";

type Props = { params: { slug: string } };

const Page = async ({ params: { slug } }: Props) => {
  const blog = await getBlogPostUsingSlug(slug);
  const validatedDate = safeParse(blogSchema, blog);
  if (!validatedDate.success) throw new DataValidationError(`blog ${slug}`);

  return (
    <Flex gap="4" direction="column">
      <AspectRatio ratio={16 / 9}>
        <Image
          fill
          src={validatedDate.output.data.cover.url}
          alt={validatedDate.output.data.cover.alternativeText || ""}
          priority
          quality={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={validatedDate.output.data.cover.placeholder}
        />
      </AspectRatio>
      <Heading size="7">{validatedDate.output.data.title}</Heading>
      <article
        className="p-4"
        dangerouslySetInnerHTML={{
          __html: validatedDate.output.data.article,
        }}
      />
    </Flex>
  );
};

export default Page;
