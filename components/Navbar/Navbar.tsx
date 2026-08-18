"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useAppCounts } from "@/app/_Context/AppCountsContext";
import { ADMIN_PROFILE_AVATAR } from "@/lib/adminAvatar";

const USER_PROFILE_AVATAR = "/games/Proflie-one.png";

/* ─── Icons ─────────────────────────────────────── */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

import NotificationBell from "./NotificationBell";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";
  const userName = session?.user?.name ?? "";
  const userEmail = session?.user?.email ?? "";
  const avatarSrc = isAdmin ? ADMIN_PROFILE_AVATAR : USER_PROFILE_AVATAR;
  const initials = userName ? userName.slice(0, 2).toUpperCase() : "G";

  const { cartCount, wishlistCount } = useAppCounts();

  // Scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  async function handleLogout() {
    setDropdownOpen(false);
    await signOut({ redirect: false });
    router.push("/");
  }

  return (
    <>
      <header className={`nb-header ${scrolled ? "nb-header--scrolled" : ""}`}>
        <div className="nb-inner">

          {/* ── Logo ── */}
          <Link href="/" className="nb-logo">
            <div className="nb-logo__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <rect x="2" y="6" width="20" height="12" rx="4" />
                <circle cx="7.5" cy="12" r="1.5" fill="white" stroke="none" />
                <circle cx="16.5" cy="12" r="1.5" fill="white" stroke="none" />
                <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="nb-logo__text">
              Game<span className="nb-logo__x">X</span>
            </span>
          </Link>

          {/* ── Nav Links (desktop) ── */}
          <nav className="nb-nav">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nb-nav__link ${isActive ? "nb-nav__link--active" : ""}`}
                >
                  {label}
                  {isActive && <span className="nb-nav__active-dot" />}
                </Link>
              );
            })}
          </nav>

          {/* ── Search ── */}
          <div className={`nb-search ${searchFocused ? "nb-search--focused" : ""}`}>
            <span className="nb-search__icon"><SearchIcon /></span>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/games?search=${encodeURIComponent(search)}`);
              }}
            >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              type="text"
              placeholder="Search games..."
              className="nb-search__input"
            />
            </form>
            <kbd className="nb-search__kbd">⌘K</kbd>
          </div>

          {/* ── Right Actions ── */}
          <div className="nb-actions">

            {isAuthenticated ? <NotificationBell /> : null}

            {/* Wishlist */}
            <Link href="/wishlist" className="nb-icon-btn" aria-label="Wishlist">
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="nb-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="nb-icon-btn" aria-label="Cart">
              <CartIcon />
              {cartCount > 0 && (
                <span className="nb-badge nb-badge--cart">{cartCount}</span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              /* User Dropdown */
              <div className="nb-dropdown" ref={dropdownRef}>
                <button
                  className="nb-user-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="User menu"
                >
                  <div className="nb-user-btn__avatar">
                    <Image
                      src={avatarSrc}
                      alt={userName}
                      width={32}
                      height={32}
                      className="nb-user-btn__img"
                    />
                    <span className="nb-user-btn__status" />
                  </div>
                  <span className="nb-user-btn__name">{userName.split(" ")[0]}</span>
                  <ChevronIcon open={dropdownOpen} />
                </button>

                {dropdownOpen && (
                  <div className="nb-dropdown__menu">
                    {/* User header */}
                    <div className="nb-dropdown__header">
                      <div className="nb-dropdown__avatar">
                        <Image
                          src={avatarSrc}
                          alt={userName}
                          width={40}
                          height={40}
                          className="nb-user-btn__img"
                        />
                      </div>
                      <div>
                        <div className="nb-dropdown__username">{userName}</div>
                        <div className="nb-dropdown__email">{userEmail}</div>
                      </div>
                    </div>
                    <div className="nb-dropdown__divider" />
                    <Link href="/profile" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                      <UserIcon />
                      <span>My Profile</span>
                    </Link>
                    <Link href="/orders" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                      <span>My Orders</span>
                    </Link>
                    <Link href="/library" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                      <span>Library</span>
                    </Link>
                    {isAdmin ? (
                      <Link href="/dashboard" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                        <SettingsIcon />
                        <span>Admin Dashboard</span>
                      </Link>
                    ) : null}
                    <Link href="/cart" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                      <CartIcon />
                      <span>My Cart</span>
                      {cartCount > 0 && <span className="nb-dropdown__count">{cartCount}</span>}
                    </Link>
                    <div className="nb-dropdown__divider" />
                    <button className="nb-dropdown__item nb-dropdown__item--danger" onClick={handleLogout}>
                      <LogoutIcon />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login / Register buttons */
              <div className="nb-auth-btns">
                <Link href="/login" className="nb-auth-btn nb-auth-btn--ghost">
                  Sign In
                </Link>
                <Link href="/register" className="nb-auth-btn nb-auth-btn--solid">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="nb-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="nb-overlay" onClick={() => setMobileOpen(false)} />
      ) : null}

      <div
        className={`nb-mobile ${mobileOpen ? "nb-mobile--open" : ""}`}
        id="mobile-nav"
        aria-hidden={!mobileOpen}
      >
        <form
          className="nb-mobile__search"
          onSubmit={(event) => {
            event.preventDefault();
            router.push(`/games?search=${encodeURIComponent(search)}`);
          }}
        >
          <span className="nb-search__icon"><SearchIcon /></span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search games..."
            className="nb-search__input"
          />
        </form>

        <nav className="nb-mobile__nav">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`nb-mobile__link ${isActive ? "nb-mobile__link--active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
          {isAuthenticated ? (
            <>
              <Link href="/profile" className={`nb-mobile__link ${pathname.startsWith("/profile") ? "nb-mobile__link--active" : ""}`}>
                My Profile
              </Link>
              <Link href="/orders" className={`nb-mobile__link ${pathname.startsWith("/orders") ? "nb-mobile__link--active" : ""}`}>
                My Orders
              </Link>
              <Link href="/library" className={`nb-mobile__link ${pathname.startsWith("/library") ? "nb-mobile__link--active" : ""}`}>
                Library
              </Link>
              {isAdmin ? (
                <Link href="/dashboard" className={`nb-mobile__link ${pathname.startsWith("/dashboard") ? "nb-mobile__link--active" : ""}`}>
                  Admin Dashboard
                </Link>
              ) : null}
            </>
          ) : null}
        </nav>

        {!isAuthenticated && (
          <div className="nb-mobile__auth">
            <Link href="/login" className="nb-auth-btn nb-auth-btn--ghost" style={{ flex: 1, textAlign: "center" }}>
              Sign In
            </Link>
            <Link href="/register" className="nb-auth-btn nb-auth-btn--solid" style={{ flex: 1, textAlign: "center" }}>
              Sign Up
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="nb-mobile__user">
            <div className="nb-mobile__user-info">
              <div className="nb-user-initials">{initials}</div>
              <div>
                <div className="nb-dropdown__username">{userName}</div>
                <div className="nb-dropdown__email">{userEmail}</div>
              </div>
            </div>
            <button className="nb-mobile__logout" onClick={handleLogout}>
              <LogoutIcon />
              Sign Out
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* ═══ Base ═══ */
        .nb-header {
          position: sticky;
          top: 0;
          z-index: 220;
          width: 100%;
          height: 68px;
          background: rgba(9, 7, 19, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }
        .nb-header--scrolled {
          background: rgba(9, 7, 19, 0.97);
          border-bottom-color: rgba(139, 92, 246, 0.12);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
          height: 62px;
        }
        .nb-inner {
          max-width: 1400px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 0 28px;
        }

        /* ═══ Logo ═══ */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo__icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
          flex-shrink: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .nb-logo:hover .nb-logo__icon {
          transform: scale(1.06);
          box-shadow: 0 6px 22px rgba(139, 92, 246, 0.55);
        }
        .nb-logo__text {
          font-size: 20px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .nb-logo__x {
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ═══ Nav ═══ */
        .nb-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .nb-nav__link {
          position: relative;
          padding: 7px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #9999b8;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nb-nav__link:hover {
          color: #f0f0f8;
          background: rgba(255, 255, 255, 0.04);
        }
        .nb-nav__link--active {
          color: #c4b5fd;
          background: rgba(139, 92, 246, 0.08);
        }
        .nb-nav__active-dot {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #8b5cf6;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(139, 92, 246, 0.7);
        }

        /* ═══ Search ═══ */
        .nb-search {
          flex: 1;
          max-width: 300px;
          display: flex;
          align-items: center;
          gap: 10px;
          height: 38px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          padding: 0 12px;
          transition: all 0.2s ease;
        }
        .nb-search:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.10);
        }
        .nb-search--focused {
          background: rgba(139, 92, 246, 0.06);
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
        }
        .nb-search__icon { color: #5f5f7a; display: flex; flex-shrink: 0; }
        .nb-search__input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: 13px;
          color: #f0f0f8;
          font-family: inherit;
          min-width: 0;
        }
        .nb-search__input::placeholder { color: #5f5f7a; }
        .nb-search__kbd {
          display: flex;
          align-items: center;
          padding: 2px 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 5px;
          font-size: 10px;
          color: #5f5f7a;
          font-family: monospace;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ═══ Actions ═══ */
        .nb-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Icon buttons */
        .nb-icon-btn {
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: #9999b8;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nb-icon-btn:hover {
          color: #f0f0f8;
          background: rgba(255, 255, 255, 0.06);
        }
        .nb-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          background: #7c3aed;
          border: 2px solid #090713;
          border-radius: 50%;
          font-size: 9px;
          font-weight: 800;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nb-badge--cart { background: #8b5cf6; }

        /* Auth buttons */
        .nb-auth-btns {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nb-auth-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9px;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-family: inherit;
        }
        .nb-auth-btn--ghost {
          color: #c4b5fd;
          border: 1px solid rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.06);
        }
        .nb-auth-btn--ghost:hover {
          background: rgba(139, 92, 246, 0.12);
          border-color: rgba(139, 92, 246, 0.45);
          color: #f0f0f8;
        }
        .nb-auth-btn--solid {
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border: 1px solid transparent;
          box-shadow: 0 3px 14px rgba(139, 92, 246, 0.3);
        }
        .nb-auth-btn--solid:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 20px rgba(139, 92, 246, 0.5);
        }

        /* ═══ User Button ═══ */
        .nb-dropdown { position: relative; }
        .nb-user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px 4px 4px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .nb-user-btn:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.3);
        }
        .nb-user-btn__avatar {
          position: relative;
          width: 30px;
          height: 30px;
        }
        .nb-user-btn__img {
          border-radius: 50%;
          object-fit: cover;
          width: 100% !important;
          height: 100% !important;
        }
        .nb-user-btn__status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 8px;
          height: 8px;
          background: #22c55e;
          border: 2px solid #090713;
          border-radius: 50%;
        }
        .nb-user-btn__name {
          font-size: 13px;
          font-weight: 600;
          color: #f0f0f8;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nb-user-btn svg { color: #9999b8; }

        /* ═══ Dropdown Menu ═══ */
        .nb-dropdown__menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 230px;
          background: #11111e;
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.03);
          overflow: hidden;
          animation: dropDown 0.18s ease;
          z-index: 230;
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nb-dropdown__header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px 12px;
        }
        .nb-dropdown__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 1.5px solid rgba(139, 92, 246, 0.3);
        }
        .nb-dropdown__username {
          font-size: 13px;
          font-weight: 700;
          color: #f0f0f8;
        }
        .nb-dropdown__email {
          font-size: 11px;
          color: #5f5f7a;
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }
        .nb-dropdown__divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 4px 0;
        }
        .nb-dropdown__item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #9999b8;
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s ease;
          text-align: left;
        }
        .nb-dropdown__item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #f0f0f8;
        }
        .nb-dropdown__item--danger:hover {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
        }
        .nb-dropdown__item svg { flex-shrink: 0; }
        .nb-dropdown__count {
          margin-left: auto;
          background: rgba(139, 92, 246, 0.2);
          color: #c4b5fd;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 99px;
        }

        /* ═══ Hamburger ═══ */
        .nb-hamburger {
          display: none;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          color: #f0f0f8;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .nb-hamburger:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
        }

        /* ═══ Mobile Menu ═══ */
        .nb-mobile {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          bottom: 0;
          background: #090713;
          border-top: 1px solid rgba(139, 92, 246, 0.1);
          transform: translateX(-100%);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, visibility 0.3s ease;
          z-index: 210;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .nb-mobile--open {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .nb-mobile__search {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 44px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 0 14px;
        }
        .nb-mobile__nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nb-mobile__link {
          display: flex;
          align-items: center;
          padding: 13px 16px;
          font-size: 16px;
          font-weight: 500;
          color: #9999b8;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .nb-mobile__link:hover { background: rgba(255,255,255,0.04); color: #f0f0f8; }
        .nb-mobile__link--active {
          background: rgba(139, 92, 246, 0.08);
          color: #c4b5fd;
        }
        .nb-mobile__auth {
          display: flex;
          gap: 10px;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .nb-mobile__user {
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .nb-mobile__user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nb-user-initials {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .nb-mobile__logout {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 10px;
          color: #ef4444;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nb-mobile__logout:hover {
          background: rgba(239,68,68,0.15);
        }

        /* Overlay */
        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ═══ Responsive ═══ */
        @media (max-width: 1150px) {
          .nb-nav { display: none; }
          .nb-search { display: none; }
          .nb-auth-btns { display: none; }
          .nb-dropdown { display: none; }
          .nb-hamburger { display: flex; }
          .nb-user-btn__name { display: none; }
          .nb-user-btn { padding: 4px; }
        }

        @media (min-width: 1151px) {
          .nb-mobile,
          .nb-overlay { display: none !important; }
        }

        @media (max-width: 520px) {
          .nb-inner { padding: 0 16px; gap: 8px; }
          .nb-logo__text { font-size: 18px; }
          .nb-actions { gap: 4px; }
          .nb-icon-btn { width: 34px; height: 34px; }
        }
      `}</style>
    </>
  );
}