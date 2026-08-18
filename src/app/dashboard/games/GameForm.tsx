"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  CreateAdminGameAction,
  UpdateAdminGameAction,
  UploadGameCoverAction,
  UploadGameGalleryAction,
} from "@/API/actions";
import type { Category, GameDetails } from "@/API/types";

export default function GameForm({
  game,
  categories = [],
}: {
  game?: GameDetails;
  categories?: Category[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [title, setTitle] = useState(game?.title ?? "");
  const [description, setDescription] = useState(game?.description ?? "");
  const [shortDescription, setShortDescription] = useState(game?.shortDescription ?? "");
  const [price, setPrice] = useState(String(game?.price ?? ""));
  const [discount, setDiscount] = useState(String(game?.discount ?? 0));
  const [stock, setStock] = useState(String(game?.stock ?? 0));
  const [developer, setDeveloper] = useState(game?.developer ?? "");
  const [publisher, setPublisher] = useState(game?.publisher ?? "");
  const [trailer, setTrailer] = useState(game?.trailer ?? "");
  const [platform, setPlatform] = useState((game?.platform ?? ["PC"]).join(", "));
  const [genre, setGenre] = useState((game?.genre ?? []).join(", "));
  const [category, setCategory] = useState(
    typeof game?.category === "string" ? game.category : game?.category?.id ?? ""
  );

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    const body = {
      title,
      description,
      shortDescription,
      price: Number(price),
      discount: Number(discount),
      stock: Number(stock),
      developer,
      publisher,
      trailer,
      platform: platform.split(",").map((value) => value.trim()).filter(Boolean),
      genre: genre.split(",").map((value) => value.trim()).filter(Boolean),
      category,
    };
    try {
      const result = game
        ? await UpdateAdminGameAction(game.id, body)
        : await CreateAdminGameAction(body);
      if (result.success) {
        toast.success(result.message ?? "Saved");
        const data = result.data as { game?: { id?: string; _id?: string }; id?: string; _id?: string } | undefined;
        const createdId = data?.game?.id || data?.game?._id || data?.id || data?._id || "";
        router.push(createdId ? `/dashboard/games/${createdId}` : "/dashboard/games");
        router.refresh();
      } else {
        toast.error(result.message ?? "Save failed");
      }
    } finally {
      setPending(false);
    }
  }

  async function upload(kind: "cover" | "gallery", fileList: FileList | null) {
    if (!game || !fileList?.length || pending) return;
    setPending(true);
    const formData = new FormData();
    if (kind === "cover") formData.append("cover", fileList[0]);
    else Array.from(fileList).forEach((file) => formData.append("gallery", file));
    try {
      const result = kind === "cover"
        ? await UploadGameCoverAction(game.id, formData)
        : await UploadGameGalleryAction(game.id, formData);
      if (result.success) toast.success(result.message ?? "Uploaded");
      else toast.error(result.message ?? "Upload failed");
    } catch {
      toast.error("Upload failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="gx-panel gx-form-grid" onSubmit={submit}>
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" required />
      <textarea value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} placeholder="Short description" />
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description" rows={5} />
      <div className="gx-filters__row">
        <input type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price" required />
        <input type="number" value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="Discount %" />
        <input type="number" value={stock} onChange={(event) => setStock(event.target.value)} placeholder="Stock" />
      </div>
      <input value={developer} onChange={(event) => setDeveloper(event.target.value)} placeholder="Developer" />
      <input value={publisher} onChange={(event) => setPublisher(event.target.value)} placeholder="Publisher" />
      <input value={trailer} onChange={(event) => setTrailer(event.target.value)} placeholder="Trailer URL" />
      <input value={platform} onChange={(event) => setPlatform(event.target.value)} placeholder="Platforms, comma separated" />
      <input value={genre} onChange={(event) => setGenre(event.target.value)} placeholder="Genres, comma separated" />
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">Select category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
      {game ? (
        <div className="gx-filters__row">
          <label className="gx-btn gx-btn--ghost">
            Upload cover
            <input type="file" accept="image/*" hidden disabled={pending} onChange={(event) => upload("cover", event.target.files)} />
          </label>
          <label className="gx-btn gx-btn--ghost">
            Upload gallery
            <input type="file" accept="image/*" multiple hidden disabled={pending} onChange={(event) => upload("gallery", event.target.files)} />
          </label>
        </div>
      ) : null}
      <button type="submit" className="gx-btn gx-btn--primary p-2!" disabled={pending}>
        {pending ? "Saving..." : game ? "Update game" : "Create game"}
      </button>
    </form>
  );
}
