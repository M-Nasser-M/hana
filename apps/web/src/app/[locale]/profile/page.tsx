import { cachedGetGovrenorates } from "@/lib/services/server/GovernoratesServiceServer";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getUserProfile } from "@/lib/services/server/profileServiceServer";
import { AuthError, DataValidationError } from "@/lib/utils/exceptions";
import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { options } from "@/app/api/auth/[...nextauth]/authOtions";
import { GovernoratesSchema } from "@/lib/types/city-governorate";
import { SessionSchema } from "@/lib/types/sharedTypes";
import type { Locale } from "@/lib/types/sharedTypes";
import { getServerSession } from "next-auth";
import ProfileTabs from "./ProfileTabs";
import { safeParse } from "valibot";
import dynamic from "next/dynamic";
import {
  profileKeys,
  type profileTranslations,
} from "../../../../messages/messagesKeys";
import { UserProfileSchema } from "@/lib/types/userProfile";
import { unstable_noStore as noStore } from "next/cache";

const EditUserEmailForm = dynamic(() => import("./EditUserEmailForm"));
const EditUserPhoneForm = dynamic(() => import("./EditUserPhoneForm"));

type Props = {
  params: { locale: Locale };
};

const Page = async ({ params: { locale } }: Props) => {
  noStore();
  unstable_setRequestLocale(locale);

  const sesssion = await getServerSession(options);

  const validateSession = safeParse(SessionSchema, sesssion);

  if (!validateSession.success) throw new AuthError();

  const [UserDataResponse, governoratesResponse] = await Promise.all([
    getUserProfile(validateSession.output.user.id),
    cachedGetGovrenorates(),
  ]);

  const validateUserData = safeParse(UserProfileSchema, UserDataResponse);

  const validatedGovernoratesData = safeParse(
    GovernoratesSchema,
    governoratesResponse
  );

  if (!validateUserData.success) throw new DataValidationError("User Profile");

  if (!validatedGovernoratesData.success)
    throw new DataValidationError("Governorates");

  const t = await getTranslations("profile");

  const translations = profileKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as profileTranslations);

  return (
    <Flex gap="2" px="4" direction={{ initial: "column", md: "row" }}>
      <Flex className="md:max-w-[30%]" direction="column" gap="4">
        <Avatar
          src={validateSession.output.user.image}
          fallback={`${validateSession.output.user.name[0]}`}
        />
        <Text color="crimson" as="label" size="4">
          {t("username")}
        </Text>
        <Text size="4">{validateUserData.output.username}</Text>
        <Flex direction="row" justify="between">
          <Text color="crimson" as="label" size="4">
            {t("email")}
          </Text>
          <EditUserEmailForm translations={translations} />
        </Flex>
        <Text size="4">
          {validateUserData.output.primaryEmail
            ? validateUserData.output.primaryEmail
            : validateUserData.output.email}
        </Text>
        <Flex direction="row" justify="between">
          <Text color="crimson" as="label" size="4">
            {t("phone")}
          </Text>
          <EditUserPhoneForm translations={translations} />
        </Flex>
        <Text size="4">{validateUserData.output.phone}</Text>
      </Flex>
      <Flex grow="1">
        <Separator size="4" color="crimson" orientation="vertical" />
      </Flex>
      <Box width="100%">
        <ProfileTabs
          governorates={validatedGovernoratesData.output.data}
          translations={translations}
          user={validateUserData.output}
        />
      </Box>
    </Flex>
  );
};

export default Page;
