import Link from "next/link";
import { notFound } from "next/navigation";
import { GetLibraryGame } from "@/API/route.services";
import { resolveCoverImage } from "@/lib/gameImages";
import CopyButton from "./CopyButton";

export const dynamic = "force-dynamic";

export default async function LibraryGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await GetLibraryGame(id);
  if (!item) notFound();

  return (
    <div className="page-wrapper">
      <div className="container gx-commerce-grid">
        <section className="gx-panel">
          <img
            src={resolveCoverImage(null, item.game.id, item.game.title, item.game.genre)}
            alt={item.game.title}
            style={{ width: "100%", borderRadius: 16, maxHeight: 360, objectFit: "cover" }}
          />
          <h1 className="section-title" style={{ marginTop: 20 }}>{item.game.title}</h1>
          <p className="section-subtitle">Ready to install. Keep your license key private.</p>
        </section>
        <aside className="gx-panel">
          <p className="gx-kicker">License key</p>
          <p className="font-mono text-lg break-all">{item.licenseKey || "Available after fulfillment"}</p>
          {item.licenseKey ? <CopyButton value={item.licenseKey} /> : null}
          {item.downloadLink ? (
            <a href={item.downloadLink} className="gx-btn gx-btn--primary gx-btn--lg" style={{ marginTop: 16 }}>
              Download
            </a>
          ) : null}
          <Link href={`/GameDetails/${item.game.slug}`} className="gx-btn gx-btn--ghost" style={{ marginTop: 12 }}>
            View store page
          </Link>
        </aside>
      </div>
    </div>
  );
}
