"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ResetPasswordAction } from "@/API/actions";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      const result = await ResetPasswordAction(token, password);
      if (result.success) {
        toast.success(result.message ?? "Password reset");
        router.push("/login");
      } else {
        toast.error(result.message ?? "Could not reset password");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="gx-panel">
          <h1 className="section-title">Reset password</h1>
          <form className="gx-form-grid" style={{ marginTop: 20 }} onSubmit={submit}>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
            />
            <button type="submit" className="gx-btn gx-btn--primary" disabled={pending}>
              {pending ? "Saving..." : "Update password"}
            </button>
            <Link href="/login" className="gx-btn gx-btn--ghost">
              Back to login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
