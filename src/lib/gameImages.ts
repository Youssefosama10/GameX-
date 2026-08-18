/**
 * Local GameX cover resolver.
 * Never uses remote API/Unsplash URLs. Same product.id + title + genre
 * always resolves to the same local AAA cover.
 */

export const FALLBACK_GAME_IMAGE = "/games/cards/action-1.png";

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
  action: ["/games/cards/action-1.png", "/games/cards/action-2.png"],
  adventure: ["/games/cards/adventure-1.png", "/games/cards/adventure-2.png"],
  rpg: ["/games/cards/rpg-1.png", "/games/cards/rpg-2.png"],
  racing: ["/games/cards/racing-1.png", "/games/cards/racing-2.png"],
  shooter: ["/games/cards/shooter-1.png", "/games/cards/shooter-2.png"],
  strategy: ["/games/cards/strategy-1.png", "/games/cards/strategy-2.png"],
  sports: ["/games/cards/sports-1.png", "/games/cards/sports-2.png"],
  puzzle: ["/games/cards/puzzle-1.png", "/games/cards/puzzle-2.png"],
  fantasy: ["/games/cards/fantasy-1.png", "/games/cards/fantasy-2.png"],
  scifi: ["/games/cards/scifi-1.png", "/games/cards/scifi-2.png"],
  horror: ["/games/cards/horror-1.png", "/games/cards/horror-2.png"],
};

export const LOCAL_HERO_IMAGES = [
  "/games/slider-one.png",
  "/games/slider-tow.png",
  "/games/slider-three.png",
  "/games/slider-Four.png",
] as const;

const TITLE_THEMES: { keywords: string[]; theme: ThemeKey }[] = [
  { theme: "fantasy", keywords: ["forest", "whisper", "dragon", "elf", "magic", "kingdom", "castle", "sword", "wizard", "mystic", "enchanted", "rune", "myth", "legend", "sorcer"] },
  { theme: "scifi", keywords: ["alien", "invasion", "space", "galaxy", "robot", "android", "orbital", "starship", "nebula", "cyber", "neon", "future", "colony", "mars", "lunar"] },
  { theme: "horror", keywords: ["horror", "haunted", "zombie", "nightmare", "fear", "blood", "undead", "evil", "terror", "curse", "occult"] },
  { theme: "racing", keywords: ["race", "racing", "drift", "circuit", "grand prix", "speedway", "rally", "forza", "nfs"] },
  { theme: "shooter", keywords: ["shooter", "sniper", "ops", "warfare", "battlefield", "tactical", "doom", "halo"] },
  { theme: "sports", keywords: ["football", "soccer", "basketball", "fifa", "nba", "tennis", "golf"] },
  { theme: "puzzle", keywords: ["puzzle", "match", "block", "tile", "brain", "portal", "tetris"] },
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
  superhero: "action",
  "open-world": "adventure",
  "open world": "adventure",
};

export const LOCAL_GAME_IMAGES = [
  "/games/cards/action-1.png",
  "/games/cards/action-2.png",
  "/games/cards/adventure-1.png",
  "/games/cards/adventure-2.png",
  "/games/cards/rpg-1.png",
  "/games/cards/rpg-2.png",
  "/games/cards/racing-1.png",
  "/games/cards/racing-2.png",
  "/games/cards/shooter-1.png",
  "/games/cards/shooter-2.png",
  "/games/cards/strategy-1.png",
  "/games/cards/strategy-2.png",
  "/games/cards/sports-1.png",
  "/games/cards/sports-2.png",
  "/games/cards/puzzle-1.png",
  "/games/cards/puzzle-2.png",
  "/games/cards/fantasy-1.png",
  "/games/cards/fantasy-2.png",
  "/games/cards/scifi-1.png",
  "/games/cards/scifi-2.png",
  "/games/cards/horror-1.png",
  "/games/cards/horror-2.png",
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
  const theme = resolveTheme(title, genre);
  if (theme) {
    return pickFrom(THEME_PACKS[theme], productId || title || theme);
  }

  if (productId) {
    return pickFrom([...LOCAL_GAME_IMAGES], productId);
  }

  if (title) {
    return pickFrom([...LOCAL_GAME_IMAGES], title);
  }

  return FALLBACK_GAME_IMAGE;
}

export function resolveHeroImage(
  _backgroundImage?: string | null,
  index = 0
): string {
  return LOCAL_HERO_IMAGES[Math.abs(index) % LOCAL_HERO_IMAGES.length];
}

export function getGameImageById(productId: string, title?: string, genre?: string | string[] | null): string {
  return resolveCoverImage(null, productId, title, genre);
}

export function getGameImage(title: string, index: number, genre?: string | string[] | null): string {
  const theme = resolveTheme(title, genre);
  const pool = theme ? THEME_PACKS[theme] : [...LOCAL_GAME_IMAGES];
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
  const thumbs = [mainImage];

  // A theme pack only holds two artworks, so its sibling goes in first and the
  // rest of the library backfills the remaining slots.
  const themeSiblings = (theme ? THEME_PACKS[theme] : []).filter((image) => image !== mainImage);
  for (const image of themeSiblings) {
    if (thumbs.length >= 6) break;
    thumbs.push(image);
  }

  const rest = LOCAL_GAME_IMAGES.filter((image) => !thumbs.includes(image));
  const start = stableHash(productId || title || "gamex") % Math.max(rest.length, 1);

  for (let i = 0; i < rest.length && thumbs.length < 6; i += 1) {
    thumbs.push(rest[(start + i) % rest.length]);
  }

  return thumbs;
}

/** @deprecated Use LOCAL_GAME_IMAGES or getGameImageById */
export const gameCardImages = [...LOCAL_GAME_IMAGES];

/** @deprecated Use LOCAL_GAME_IMAGES */
export const allLocalGameImages = [...LOCAL_GAME_IMAGES];
