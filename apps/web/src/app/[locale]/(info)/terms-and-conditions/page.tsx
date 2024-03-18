import { getTermsAndConditionsCached } from "@/lib/services/server/InfoPagesService";
import { ArticleAndSeoSchema } from "@/lib/types/mainPages";
import type { Locale } from "@/lib/types/sharedTypes";
import { unstable_setRequestLocale } from "next-intl/server";
import { safeParse } from "valibot";

type Props = {
  params: { locale: Locale };
};
const Page = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const termsAndConditions = await getTermsAndConditionsCached(locale);
  const validateData = safeParse(ArticleAndSeoSchema, termsAndConditions);
  if (!validateData.success)
    throw new Error("Terms And Conditions Data is not valid");
  return (
    <article
      dangerouslySetInnerHTML={{
        __html: validateData.output.data.article || "",
      }}
      className="prose prose-slate dark:prose-invert md:prose-lg lg:prose-xl"
    />
  );
};

export default Page;
