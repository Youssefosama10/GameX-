"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { GetNavbarCountsAction } from "@components/GameCard/wishlist.Actions";

interface AppCountsContextValue {
  cartCount: number;
  wishlistCount: number;
  loadingCounts: boolean;
  setCartCount: (count: number) => void;
  setWishlistCount: (count: number) => void;
  refreshCounts: () => Promise<void>;
}

const AppCountsContext = createContext<AppCountsContextValue | null>(null);

export function useAppCounts(): AppCountsContextValue {
  const context = useContext(AppCountsContext);
  if (!context) {
    throw new Error("useAppCounts must be used within AppCountsProvider");
  }
  return context;
}

export default function AppCountsProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loadingCounts, setLoadingCounts] = useState(false);

  const refreshCounts = useCallback(async () => {
    if (status !== "authenticated") {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    setLoadingCounts(true);
    try {
      const counts = await GetNavbarCountsAction();
      setCartCount(counts.cartCount);
      setWishlistCount(counts.wishlistCount);
    } catch {
      setCartCount(0);
      setWishlistCount(0);
    } finally {
      setLoadingCounts(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      refreshCounts();
    } else if (status === "unauthenticated") {
      setCartCount(0);
      setWishlistCount(0);
    }
  }, [status, refreshCounts]);

  const value = useMemo(
    () => ({
      cartCount,
      wishlistCount,
      loadingCounts,
      setCartCount,
      setWishlistCount,
      refreshCounts,
    }),
    [cartCount, wishlistCount, loadingCounts, refreshCounts]
  );

  return <AppCountsContext.Provider value={value}>{children}</AppCountsContext.Provider>;
}
