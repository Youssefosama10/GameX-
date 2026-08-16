"use client";

import { toast } from "react-toastify";

export default function CopyButton({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="gx-btn gx-btn--ghost"
      style={{ marginTop: 12 }}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        toast.success("License key copied");
      }}
    >
      Copy key
    </button>
  );
}
