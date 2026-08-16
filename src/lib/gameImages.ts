/**
 * Local GameX cover resolver.
 * Never uses remote API/Unsplash URLs. Same product.id + title + genre
 * always resolves to the same local artwork.
 */

export const FALLBACK_GAME_IMAGE = "/games/GamesX-1.png";

const FAMOUS_TITLES: { keywords: string[]; path: string }[] = [
  { keywords: ["spider", "spiderman", "spider-man"], path: "/spiderman.png" },
  { keywords: ["batman", "arkham"], path: "/batman.png" },
  { keywords: ["god of war", "godofwar", "kratos"], path: "/games/god-of-war.png" },
  { keywords: ["cyberpunk", "cyber punk", "night city"], path: "/games/cyberpunk-2077.png" },
  { keywords: ["red dead", "redemption", "rdr"], path: "/games/red-dead-redemption.png" },
  { keywords: ["elden ring", "elden"], path: "/games/elden-ring.png" },
  { keywords: ["horizon", "forbidden west", "aloy"], path: "/games/horizon-forbidden-west.png" },
  { keywords: ["ghost of tsushima", "tsushima"], path: "/games/ghost-of-tsushima.png" },
  { keywords: ["resident evil", "re4", "leon"], path: "/games/resident-evil-4.png" },
  { keywords: ["sekiro", "shadows die"], path: "/games/sekiro.png" },
  { keywords: ["final fantasy", "ff16", "ff xvi", "clive"], path: "/games/final-fantasy-xvi.png" },
  { keywords: ["witcher", "geralt"], path: "/games/witcher-3.png" },
];

export type ThemeKey =
  | "action"
  | "adventure"
  | "rpg"
  | "racing"
  | "shooter"
  | "strategy"
  | "sports"
  | "puzzle"
  | "fantasy"
  | "scifi"
  | "horror";

export const THEME_PACKS: Record<ThemeKey, string[]> = {
  action: ["/games/themes/action-1.png", "/games/themes/action-2.png", "/games/themes/action-3.png"],
  adventure: ["/games/themes/adventure-1.png", "/games/themes/adventure-2.png", "/games/themes/adventure-3.png"],
  rpg: ["/games/themes/rpg-1.png", "/games/themes/rpg-2.png", "/games/themes/rpg-3.png"],
  racing: ["/games/themes/racing-1.png", "/games/themes/racing-2.png", "/games/themes/racing-3.png"],
  shooter: ["/games/themes/shooter-1.png", "/games/themes/shooter-2.png", "/games/themes/shooter-3.png"],
  strategy: ["/games/themes/strategy-1.png", "/games/themes/strategy-2.png", "/games/themes/strategy-3.png"],
  sports: ["/games/themes/sports-1.png", "/games/themes/sports-2.png", "/games/themes/sports-3.png"],
  puzzle: ["/games/themes/puzzle-1.png", "/games/themes/puzzle-2.png", "/games/themes/puzzle-3.png"],
  fantasy: ["/games/themes/fantasy-1.png", "/games/themes/fantasy-2.png", "/games/themes/fantasy-3.png"],
  scifi: ["/games/themes/scifi-1.png", "/games/themes/scifi-2.png", "/games/themes/scifi-3.png"],
  horror: ["/games/themes/horror-1.png", "/games/themes/horror-2.png", "/games/themes/horror-3.png"],
};

const TITLE_THEMES: { keywords: string[]; theme: ThemeKey }[] = [
  { theme: "fantasy", keywords: ["forest", "whisper", "dragon", "elf", "magic", "kingdom", "castle", "sword", "wizard", "mystic", "enchanted", "rune", "myth", "legend", "sorcer"] },
  { theme: "scifi", keywords: ["alien", "invasion", "space", "galaxy", "robot", "android", "orbital", "starship", "nebula", "cyber", "neon", "future", "colony", "mars", "lunar"] },
  { theme: "horror", keywords: ["horror", "haunted", "zombie", "nightmare", "fear", "blood", "undead", "evil", "terror", "curse", "occult"] },
  { theme: "racing", keywords: ["race", "racing", "drift", "circuit", "grand prix", "speedway", "rally"] },
  { theme: "shooter", keywords: ["shooter", "sniper", "ops", "warfare", "battlefield", "tactical"] },
  { theme: "sports", keywords: ["football", "soccer", "basketball", "fifa", "nba", "tennis", "golf"] },
  { theme: "puzzle", keywords: ["puzzle", "match", "block", "tile", "brain"] },
  { theme: "strategy", keywords: ["strategy", "empire", "commander", "civilization", "tactics", "war room"] },
  { theme: "adventure", keywords: ["adventure", "quest", "expedition", "explorer", "island", "lost"] },
  { theme: "action", keywords: ["action", "combat", "fighter", "brawl", "assassin"] },
  { theme: "rpg", keywords: ["rpg", "role", "level up", "dungeon"] },
];

const GENRE_THEMES: Record<string, ThemeKey> = {
  action: "action",
  adventure: "adventure",
  rpg: "rpg",
  racing: "racing",
  shooter: "shooter",
  strategy: "strategy",
  sports: "sports",
  puzzle: "puzzle",
  horror: "horror",
  fantasy: "fantasy",
  "sci-fi": "scifi",
  scifi: "scifi",
  "science fiction": "scifi",
  simulation: "strategy",
  fighting: "action",
  stealth: "action",
  platformer: "adventure",
};

const ALL_THEME_IMAGES = Object.values(THEME_PACKS).flat();

export const LOCAL_GAME_IMAGES = [
  "/games/witcher-3.png",
  "/games/batman_cover_1786239716380.png",
  "/games/red-dead-redemption.png",
  "/games/god-of-war.png",
  "/games/cyberpunk-2077.png",
  "/games/cyberpunk_cover_1786239783316.png",
  "/games/final-fantasy-xvi.png",
  "/games/ghost-of-tsushima.png",
  "/games/godofwar_cover_1786239735349.png",
  "/games/spiderman_cover_1786239765180.png",
  "/games/resident-evil-4.png",
  "/games/sekiro.png",
  "/games/horizon-forbidden-west.png",
  "/games/elden-ring.png",
  "/games/rdr_cover_1786239795096.png",
  "/games/GamesX-1.png",
  "/spiderman.png",
  "/batman.png",
  ...ALL_THEME_IMAGES,
] as const;

export function stableHash(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickFrom(pool: string[], seed: string): string {
  if (!pool.length) return FALLBACK_GAME_IMAGE;
  return pool[stableHash(seed || "gamex") % pool.length];
}

function normalizeGenre(genre?: string | string[] | null): string[] {
  if (!genre) return [];
  return (Array.isArray(genre) ? genre : [genre])
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function matchFamousTitle(title?: string): string | null {
  if (!title) return null;
  const lower = title.toLowerCase();
  for (const entry of FAMOUS_TITLES) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      return entry.path;
    }
  }
  return null;
}

function matchTitleTheme(title?: string): ThemeKey | null {
  if (!title) return null;
  const lower = title.toLowerCase();
  for (const entry of TITLE_THEMES) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      return entry.theme;
    }
  }
  return null;
}

function matchGenreTheme(genre?: string | string[] | null): ThemeKey | null {
  for (const value of normalizeGenre(genre)) {
    if (GENRE_THEMES[value]) return GENRE_THEMES[value];
  }
  return null;
}

export function resolveTheme(title?: string, genre?: string | string[] | null): ThemeKey | null {
  return matchTitleTheme(title) ?? matchGenreTheme(genre);
}

export function resolveCoverImage(
  _coverImage?: string | null,
  productId?: string,
  title?: string,
  genre?: string | string[] | null
): string {
  const famous = matchFamousTitle(title);
  if (famous) return famous;

  const theme = resolveTheme(title, genre);
  if (theme) {
    return pickFrom(THEME_PACKS[theme], productId || title || theme);
  }

  if (productId) {
    return pickFrom(ALL_THEME_IMAGES, productId);
  }

  if (title) {
    return pickFrom(ALL_THEME_IMAGES, title);
  }

  return FALLBACK_GAME_IMAGE;
}

export function getGameImageById(productId: string, title?: string, genre?: string | string[] | null): string {
  return resolveCoverImage(null, productId, title, genre);
}

export function getGameImage(title: string, index: number, genre?: string | string[] | null): string {
  const famous = matchFamousTitle(title);
  if (famous) return famous;
  const theme = resolveTheme(title, genre);
  const pool = theme ? THEME_PACKS[theme] : ALL_THEME_IMAGES;
  return pool[Math.abs(index) % pool.length] ?? FALLBACK_GAME_IMAGE;
}

export function getGameImageForProduct(
  productId: string,
  title?: string,
  index = 0,
  genre?: string | string[] | null
): string {
  return resolveCoverImage(null, productId || undefined, title, genre) || getGameImage(title ?? "", index, genre);
}

export function getGameCoverImage(index: number): string {
  if (index < 0 || Number.isNaN(index)) return LOCAL_GAME_IMAGES[0];
  return LOCAL_GAME_IMAGES[index % LOCAL_GAME_IMAGES.length];
}

export function getGameThumbnails(
  productId: string,
  title?: string,
  genre?: string | string[] | null
): string[] {
  const mainImage = resolveCoverImage(null, productId, title, genre);
  const theme = resolveTheme(title, genre);
  const pool = (theme ? THEME_PACKS[theme] : ALL_THEME_IMAGES).filter((image) => image !== mainImage);
  const thumbs = [mainImage];
  const start = stableHash(productId || title || "gamex") % Math.max(pool.length, 1);

  for (let i = 0; i < pool.length && thumbs.length < 4; i += 1) {
    thumbs.push(pool[(start + i) % pool.length]);
  }

  return thumbs;
}

/** @deprecated Use LOCAL_GAME_IMAGES or getGameImageById */
export const gameCardImages = [...LOCAL_GAME_IMAGES];

/** @deprecated Use LOCAL_GAME_IMAGES */
export const allLocalGameImages = [...LOCAL_GAME_IMAGES];
