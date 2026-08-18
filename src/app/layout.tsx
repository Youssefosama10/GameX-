import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import WrapperForSessionProvider from "../../components/WrapperForSessionProvider/WrapperForSessionProvider";
import StoreChrome from "../../components/StoreChrome/StoreChrome";
import AppCountsProvider from "./_Context/AppCountsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function metadataBaseFromEnv(): URL | undefined {
  const raw = process.env.NEXTAUTH_URL;
  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: metadataBaseFromEnv(),
  title: "GameX — Your Ultimate Gaming Store",
  description: "Discover, buy and track your games on GameX — the ultimate digital gaming marketplace.",
  icons: {
    icon: "/icon-gx.png",
    shortcut: "/icon-gx.png",
    apple: "/icon-gx.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}>
        <WrapperForSessionProvider>
          <AppCountsProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={2500}
              theme="dark"
              newestOnTop
              closeOnClick
              pauseOnHover
            />
            <StoreChrome>{children}</StoreChrome>
          </AppCountsProvider>
        </WrapperForSessionProvider>
      </body>
    </html>
  );
}
