import { getServerSession } from "next-auth";
import { NextAuthConfig } from "@/Next-Auth/next-auth.Config";

interface SessionWithToken {
  userToken?: string;
}

export async function AuthenticatedUserToken(): Promise<string | undefined> {
  const session = (await getServerSession(NextAuthConfig)) as SessionWithToken | null;
  return session?.userToken;
}
