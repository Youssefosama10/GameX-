import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { buildApiUrl } from "@/API/config";
import { getAccessTokenExpiry, refreshAccessToken } from "@/API/auth";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  userToken: string;
  refreshToken?: string;
  accessTokenExpires: number;
}

interface AuthJwt extends JWT {
  id?: string;
  role?: string;
  RouteToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  error?: string;
}

async function refreshJwtToken(token: AuthJwt): Promise<AuthJwt> {
  if (!token.refreshToken) {
    return { ...token, error: "RefreshTokenMissing" };
  }

  const refreshed = await refreshAccessToken(token.refreshToken);

  if (!refreshed) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  return {
    ...token,
    RouteToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken,
    accessTokenExpires: refreshed.accessTokenExpires,
    error: undefined,
  };
}

export const NextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "GameX",
      credentials: {
        email: { label: "Email", placeholder: "Enter your Email", type: "email" },
        password: { label: "password", placeholder: "Enter your password", type: "password" },
      },
      authorize: async function (credentials) {
        const requestLogin = await fetch(buildApiUrl("auth/login"), {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "content-type": "application/json" },
        });

        const responesLogin = await requestLogin.json();

        if (responesLogin.success) {
          const { fullName, email, role } = responesLogin.data.user;
          const accessToken = responesLogin.data.accessToken as string;
          const refreshToken = responesLogin.data.refreshToken as string | undefined;
          const data = jwtDecode<{ id: string }>(accessToken);

          return {
            name: fullName,
            email,
            id: data.id,
            userToken: accessToken,
            refreshToken,
            role: role as string,
            accessTokenExpires: getAccessTokenExpiry(accessToken),
          } satisfies AuthUser;
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  // jwt: {
  //   maxAge: 60 * 60 * 24 * 3,
  // },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt: async function ({ token, user }) {
      const authToken = token as AuthJwt;

      
      if (user) {
        const authUser = user as AuthUser;
        authToken.RouteToken = authUser.userToken;
        authToken.refreshToken = authUser.refreshToken;
        authToken.accessTokenExpires = authUser.accessTokenExpires;
        authToken.id = authUser.id;
        authToken.role = authUser.role;
        authToken.error = undefined;
        return authToken;
      }

      const expiresAt = authToken.accessTokenExpires ?? 0;
      const shouldRefresh = Date.now() >= expiresAt - 60 * 1000;

      if (shouldRefresh && authToken.refreshToken) {
        return refreshJwtToken(authToken);
      }

      return authToken;
    },

    session: function ({ session, token }) {
      const authToken = token as AuthJwt;

      if (session.user) {
        session.user.id = authToken.id;
        session.user.role = authToken.role;
      }

      session.id = authToken.id;
      session.userToken = authToken.RouteToken;
      session.error = authToken.error;

      return session;
    },
  },

  events: {
    async signOut({ token }) {
      const accessToken = (token as AuthJwt | undefined)?.RouteToken;
      if (!accessToken) return;
      try {
        await fetch(buildApiUrl("auth/logout"), {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          cache: "no-store",
        });
      } catch {
        // Client sign-out still proceeds.
      }
    },
  },
};
