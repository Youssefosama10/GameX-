"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ChangePasswordAction, UpdateProfileAction, UploadAvatarAction } from "@/API/actions";
import type { UserProfile } from "@/API/types";
import { formatDate } from "@/lib/format";

export default function ProfileClient({ profile }: { profile?: UserProfile }) {
  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [username, setUsername] = useState(profile?.username ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      const result = await UpdateProfileAction({ firstName, lastName, username });
      if (result.success) toast.success(result.message ?? "Profile updated");
      else toast.error(result.message ?? "Update failed");
    } finally {
      setPending(false);
    }
  }

  async function savePassword(event: React.FormEvent) {
    event.preventDefault();
    const result = await ChangePasswordAction(currentPassword, newPassword);
    if (result.success) {
      toast.success(result.message ?? "Password changed");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      toast.error(result.message ?? "Could not change password");
    }
  }

  async function uploadAvatar(file?: File) {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    const result = await UploadAvatarAction(formData);
    if (result.success) toast.success(result.message ?? "Avatar updated");
    else toast.error(result.message ?? "Upload failed");
  }

  return (
    <section className="gx-panel">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile?.avatar || "https://i.pravatar.cc/150?img=12"}
          alt={profile?.fullName || profile?.username || "Avatar"}
          className="h-20 w-20 rounded-full object-cover border border-violet-500/40"
        />
        <div>
          <h1 className="section-title" style={{ fontSize: 28 }}>
            {profile?.fullName || `${firstName} ${lastName}`.trim() || "My Profile"}
          </h1>
          <p className="section-subtitle">
            {profile?.email} · Joined {formatDate(profile?.createdAt)} · {profile?.role || "user"}
          </p>
        </div>
      </div>

      <form className="gx-form-grid" onSubmit={saveProfile}>
        <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name" />
        <input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name" />
        <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
        <label className="gx-btn gx-btn--ghost">
          Upload avatar
          <input type="file" accept="image/*" hidden onChange={(event) => uploadAvatar(event.target.files?.[0])} />
        </label>
        <button type="submit" className="gx-btn gx-btn--primary" disabled={pending}>
          {pending ? "Saving..." : "Save profile"}
        </button>
      </form>

      <form className="gx-form-grid" style={{ marginTop: 28 }} onSubmit={savePassword}>
        <h2 className="section-title" style={{ fontSize: 20 }}>Change password</h2>
        <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Current password" />
        <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password" />
        <button type="submit" className="gx-btn gx-btn--ghost">
          Update password
        </button>
      </form>
    </section>
  );
}
