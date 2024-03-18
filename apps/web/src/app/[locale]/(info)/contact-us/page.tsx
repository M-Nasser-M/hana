import type { Locale } from "@/lib/types/sharedTypes";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: Locale };
};
const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  return (
    <article className="prose prose-slate dark:prose-invert md:prose-lg lg:prose-xl">
      <div>contact us</div>
    </article>
  );
};

export default Page;
