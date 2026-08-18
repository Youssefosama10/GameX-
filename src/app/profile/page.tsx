import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  Gamepad2,
  Globe,
  Heart,
  Mail,
  Moon,
  Package,
  ShieldCheck,
  ShoppingBag,
  Swords,
  Trophy,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { GamesCard } from "@/API/types";
import { GetHomeData, GetLibrary, GetMyOrders, GetMyProfile, GetRecentlyViewed } from "@/API/route.services";
import { formatDate } from "@/lib/format";
import { LOCAL_GAME_IMAGES, resolveCoverImage } from "@/lib/gameImages";
import ProfileClient from "./ProfileClient";
import PreferencesPanel from "./PreferencesPanel";

export const dynamic = "force-dynamic";

const PLAYED_HOURS = ["45h", "32h", "28h", "19h"];

type PlayedItem = {
  key: string;
  title: string;
  cover: string;
  hours: string;
  href?: string;
};

function toPlayedItem(game: GamesCard, index: number): PlayedItem {
  return {
    key: game.id,
    title: game.title,
    cover: resolveCoverImage(null, game.id, game.title, game.genre),
    hours: `${PLAYED_HOURS[index % PLAYED_HOURS.length]} played`,
    href: `/GameDetails/${game.slug}`,
  };
}

function collectHomeGames(home: Awaited<ReturnType<typeof GetHomeData>>): GamesCard[] {
  if (!home) return [];
  const flashGames = (home.flashSale?.games ?? []).map((item) => item.game);
  const pool = [
    ...home.featuredGames,
    ...home.trendingGames,
    ...home.newReleases,
    ...home.topRated,
    ...flashGames,
  ];
  const seen = new Set<string>();
  const unique: GamesCard[] = [];
  for (const game of pool) {
    if (!game?.id || seen.has(game.id)) continue;
    seen.add(game.id);
    unique.push(game);
    if (unique.length >= 4) break;
  }
  return unique;
}

const ACHIEVEMENTS: { icon: LucideIcon; title: string; description: string; date: string }[] = [
  { icon: Swords, title: "First Blood", description: "Won your first match", date: "Unlocked on May 12, 2024" },
  { icon: Moon, title: "Night Owl", description: "Played after midnight", date: "Unlocked on Jun 3, 2024" },
  { icon: Package, title: "Collection Master", description: "Own 20+ games", date: "Unlocked on Jul 18, 2024" },
  { icon: Zap, title: "Unstoppable", description: "10 wins in a row", date: "Unlocked on Aug 1, 2024" },
];

function AchievementHex({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="pf-ach__hex">
      <svg className="pf-ach__hex-shape" viewBox="0 0 46 50" fill="none" aria-hidden="true">
        <polygon
          points="23,2 44,13.5 44,36.5 23,48 2,36.5 2,13.5"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="rgba(139, 92, 246, 0.12)"
        />
      </svg>
      <Icon size={18} />
    </div>
  );
}

export default async function ProfilePage() {
  const [profile, orders, library, recent, home] = await Promise.all([
    GetMyProfile(),
    GetMyOrders(1, 5),
    GetLibrary(),
    GetRecentlyViewed(),
    GetHomeData(),
  ]);

  const homePlayed = collectHomeGames(home).map((game, index) => toPlayedItem(game, index));
  const recentGames = recent.slice(0, 4);
  const usedIds = new Set(recentGames.map((game) => game.id));
  const usedTitles = new Set(recentGames.map((game) => game.title.toLowerCase()));
  const usedCovers = new Set<string>();

  const playedItems: PlayedItem[] = recentGames.map((game, index) => {
    const item = toPlayedItem(game, index);
    usedCovers.add(item.cover);
    return item;
  });

  for (const fallback of homePlayed) {
    if (playedItems.length >= 4) break;
    if (usedIds.has(fallback.key) || usedTitles.has(fallback.title.toLowerCase())) continue;
    usedIds.add(fallback.key);
    usedTitles.add(fallback.title.toLowerCase());
    usedCovers.add(fallback.cover);
    playedItems.push(fallback);
  }

  for (let index = 0; index < LOCAL_GAME_IMAGES.length && playedItems.length < 4; index += 1) {
    const cover = LOCAL_GAME_IMAGES[index];
    if (usedCovers.has(cover)) continue;
    usedCovers.add(cover);
    playedItems.push({
      key: `local-card-${index}`,
      title: `Featured Game ${playedItems.length + 1}`,
      cover,
      hours: `${PLAYED_HOURS[playedItems.length % PLAYED_HOURS.length]} played`,
    });
  }

  const orderCount = orders?.pagination?.total ?? orders?.orders?.length ?? 0;
  const displayName = profile?.fullName || [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || "—";

  return (
    <div className="page-wrapper">
      <div className="container pf-page">
        <ProfileClient profile={profile} />

        <section className="pf-stats" aria-label="Profile stats">
          <StatTile icon={Gamepad2} label="Total Games" value={String(library.length)} />
          <StatTile icon={Clock} label="Hours Played" value="186h" />
          <StatTile icon={Trophy} label="Achievements" value="38" />
          <StatTile icon={Heart} label="Wishlist" value="12" />
          <StatTile icon={ShoppingBag} label="Orders" value={String(orderCount)} />
        </section>

        <div className="pf-split">
          <section className="pf-panel pf-panel--flush">
            <div className="pf-panel__head">
              <h2 className="pf-panel__title">Recently Played</h2>
              <Link href="/library" className="pf-panel__link">
                View All
              </Link>
            </div>
            <div className="pf-played__grid">
              {playedItems.slice(0, 4).map((game) => (
                <PlayedCard
                  key={game.key}
                  href={game.href}
                  title={game.title}
                  cover={game.cover}
                  hours={game.hours}
                />
              ))}
            </div>
          </section>

          <section className="pf-panel">
            <div className="pf-panel__head">
              <h2 className="pf-panel__title">Achievements</h2>
              <span className="pf-panel__link">View All</span>
            </div>
            <div className="pf-ach">
              {ACHIEVEMENTS.map((item) => (
                <article key={item.title} className="pf-ach__item">
                  <AchievementHex icon={item.icon} />
                  <div className="pf-ach__body">
                    <h3 className="pf-ach__title">{item.title}</h3>
                    <p className="pf-ach__desc">{item.description}</p>
                    <p className="pf-ach__date">{item.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="pf-split">
          <section className="pf-panel">
            <div className="pf-panel__head">
              <h2 className="pf-panel__title">Account Information</h2>
            </div>
            <div className="pf-account">
              <AccountRow icon={User} label="Full Name" value={displayName} />
              <AccountRow icon={Mail} label="Email" value={profile?.email || "—"} />
              <AccountRow icon={Globe} label="Country" value="Egypt" />
              <AccountRow icon={CalendarDays} label="Member Since" value={formatDate(profile?.createdAt)} />
              <AccountRow icon={ShieldCheck} label="Account Status">
                <span className="pf-account__status">Active</span>
              </AccountRow>
            </div>
          </section>

          <PreferencesPanel />
        </div>

        <section>
          <div className="pf-panel__head">
            <h2 className="pf-panel__title">Your Level</h2>
          </div>
          <div className="pf-level">
            <Image
              src="/games/Proflie-three.png"
              alt=""
              fill
              className="pf-level__bg"
              sizes="(max-width: 1280px) 100vw, 1232px"
            />
            <div className="pf-level__overlay" />
            <span className="pf-level__watermark" aria-hidden="true">
              13
            </span>
            <div className="pf-level__content">
              <div className="pf-hex-wrap">
                <div className="pf-hex">
                  <strong>75</strong>
                  <span>Level</span>
                </div>
              </div>
              <div className="pf-level__progress">
                <p className="pf-level__xp">1,250 XP to next level</p>
                <div className="pf-level__bar" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
                  <div className="pf-level__fill" />
                </div>
              </div>
              <div className="pf-level__meta">
                <div className="pf-level__labels">
                  <p>
                    <strong>75</strong> Current Level
                  </p>
                  <p>
                    <strong>76</strong> Next Level
                  </p>
                </div>
                <div className="pf-hex-wrap pf-hex-wrap--muted">
                  <div className="pf-hex pf-hex--muted">
                    <strong>76</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="pf-stats__item">
      <Icon className="pf-stats__icon" />
      <span className="pf-stats__label">{label}</span>
      <span className="pf-stats__value">{value}</span>
      <span className="pf-stats__line" aria-hidden="true" />
    </div>
  );
}

function AccountRow({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: LucideIcon;
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="pf-account__row">
      <div className="pf-account__icon">
        <Icon size={16} />
      </div>
      <div className="pf-account__text">
        <span className="pf-account__label">{label}</span>
        {children ?? <span className="pf-account__value">{value}</span>}
      </div>
    </div>
  );
}

function PlayedCard({
  href,
  title,
  cover,
  hours,
}: {
  href?: string;
  title: string;
  cover: string;
  hours: string;
}) {
  const body = (
    <>
      <div className="pf-played__cover">
        <Image src={cover} alt={title} fill className="pf-played__cover-img" sizes="180px" />
      </div>
      <span className="pf-played__title">{title}</span>
      <span className="pf-played__hours">{hours}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="pf-played__card">
        {body}
      </Link>
    );
  }

  return <div className="pf-played__card">{body}</div>;
}
