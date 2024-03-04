import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";
import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AdapterUser } from "next-auth/adapters";

import type { JWT } from "next-auth/jwt";
import { serverApi } from "@/lib/services/server/ServerApi";
import type { UserData } from "@/lib/types/user";
import { serverEnv } from "@/serverEnv";
import type { CartData } from "@/lib/types/cart";

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: serverEnv.FACEBOOK_CLIENT_ID,
      clientSecret: serverEnv.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: serverEnv.INSTAGRAM_CLIENT_ID,
      clientSecret: serverEnv.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      const extendedSession = {
        ...session,
        user: { ...session.user, id: token.id, cartId: token.cartId },
        jwt: token.jwt,
      };
      return extendedSession;
    },
    jwt: async ({ token, user, account }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await serverApi.get<{
          jwt: JWT;
          user: User | AdapterUser;
        }>(
          `/auth/${account?.provider}/callback?access_token=${account?.access_token}`
        );
        const userData = await serverApi.get<UserData & { cart?: CartData }>(
          "/users/me?populate=cart",
          {
            headers: {
              Authorization: `Bearer ${response.jwt}`,
              "Content-Type": "application/json",
            },
          }
        );

        token.jwt = response.jwt;
        token.id = response.user.id;
        token.cartId = userData.cart?.id;
      }
      return token;
    },
    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
