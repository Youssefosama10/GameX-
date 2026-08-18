import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

export async function AuthenticatedUserToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookiesObject = Object.fromEntries(
    cookieStore.getAll().map((cookie) => [cookie.name, cookie.value])
  );

  if (!Object.keys(cookiesObject).length) {
    return undefined;
  }

  const token = await getToken({
    req: {
      cookies: cookiesObject,
      headers: {
        cookie: cookieStore
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    } as Parameters<typeof getToken>[0]["req"],
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.RouteToken;
}
