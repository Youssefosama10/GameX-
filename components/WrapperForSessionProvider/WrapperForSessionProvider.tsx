"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

function SessionErrorHandler({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (
      session?.error === "RefreshAccessTokenError" ||
      session?.error === "RefreshTokenMissing"
    ) {
      void signOut({ redirect: false });
    }
  }, [session?.error]);

  return children;
}

export default function WrapperForSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionErrorHandler>{children}</SessionErrorHandler>
    </SessionProvider>
  );
}
