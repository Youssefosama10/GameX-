"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { ForgotPasswordAction } from "@/API/actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      const result = await ForgotPasswordAction(email);
      if (result.success) toast.success(result.message ?? "Reset email sent");
      else toast.error(result.message ?? "Could not send reset email");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="gx-panel">
          <h1 className="section-title">Forgot password</h1>
          <p className="section-subtitle">Enter your email and we will send a reset link.</p>
          <form className="gx-form-grid" style={{ marginTop: 20 }} onSubmit={submit}>
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
            <button type="submit" className="gx-btn gx-btn--primary" disabled={pending}>
              {pending ? "Sending..." : "Send reset link"}
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
