"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ForgotPasswordAction } from "@/API/actions";

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export default function ForgotPasswordForm() {
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
    <form className="fp-form" onSubmit={submit}>
      <h1 id="forgot-title" className="fp-title">
        Forgot <span>Password?</span>
      </h1>
      <p className="fp-subtitle">
        No worries! Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      <div className="form-group">
        <label htmlFor="email" className="form-label fp-label">
          Email Address
        </label>
        <div className="input-wrap">
          <span className="input-icon">
            <IconMail />
          </span>
          <input
            id="email"
            type="email"
            required
            className="form-input fp-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
          />
        </div>
      </div>

      <button type="submit" className="fp-submit" disabled={pending}>
        {pending ? "Sending..." : "Send Reset Link"}
        {!pending && <IconSend />}
      </button>

      <div className="fp-info">
        <span className="fp-info__icon" aria-hidden="true">
          <IconShield />
        </span>
        <p>
          We&apos;ll send a secure link to your email. The link will expire in{" "}
          <strong>15 minutes</strong>.
        </p>
      </div>
    </form>
  );
}
