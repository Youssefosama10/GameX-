"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { BadgeCheck, CalendarDays, Camera, MapPin, X } from "lucide-react";
import { ChangePasswordAction, UpdateProfileAction, UploadAvatarAction } from "@/API/actions";
import type { UserProfile } from "@/API/types";
import { formatDate } from "@/lib/format";
import { ADMIN_PROFILE_AVATAR } from "@/lib/adminAvatar";

const BANNER_SRC = "/games/Proflie-tow.png";

export default function ProfileClient({ profile }: { profile?: UserProfile }) {
  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [username, setUsername] = useState(profile?.username ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [editing, setEditing] = useState(false);

  const displayName =
    profile?.fullName || `${firstName} ${lastName}`.trim() || "My Profile";
  const handle = username || profile?.username || "user";

  useEffect(() => {
    if (!editing) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setEditing(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [editing]);

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      const result = await UpdateProfileAction({ firstName, lastName, username });
      if (result.success) {
        toast.success(result.message ?? "Profile updated");
        setEditing(false);
      } else toast.error(result.message ?? "Update failed");
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
      setEditing(false);
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
    <>
      <section className="pf-hero">
        <Image
          src={BANNER_SRC}
          alt=""
          fill
          preload
          className="pf-hero__bg"
          sizes="(max-width: 1280px) 100vw, 1232px"
        />
        <div className="pf-hero__overlay" />
        <div className="pf-hero__content">
          <div className="pf-hero__avatar-wrap">
            <div className="pf-hero__avatar">
              <div className="pf-hero__avatar-inner">
                <Image
                  src={
                    profile?.role === "admin"
                      ? ADMIN_PROFILE_AVATAR
                      : profile?.avatar || ADMIN_PROFILE_AVATAR
                  }
                  alt={displayName}
                  fill
                  className="pf-hero__avatar-img"
                  sizes="112px"
                />
              </div>
            </div>
            <label className="pf-hero__camera" aria-label="Upload avatar">
              <Camera size={13} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => uploadAvatar(event.target.files?.[0])}
              />
            </label>
          </div>

          <div className="pf-hero__info">
            <h1 className="pf-hero__name">
              {displayName}
              <BadgeCheck size={20} aria-hidden="true" />
            </h1>
            <p className="pf-hero__handle">@{handle}</p>
            <p className="pf-hero__bio">
              Game on. <span>Level up.</span> Repeat.
            </p>
            <div className="pf-hero__meta">
              <span>
                <CalendarDays aria-hidden="true" />
                Joined {formatDate(profile?.createdAt)}
              </span>
              <span>
                <MapPin aria-hidden="true" />
                Egypt
              </span>
            </div>
          </div>

          <button type="button" className="pf-hero__edit" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      </section>

      {editing ? (
        <div
          className="pf-modal-backdrop"
          onClick={() => setEditing(false)}
        >
          <div
            className="pf-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pf-edit-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pf-modal__head">
              <h2 id="pf-edit-title">Edit Profile</h2>
              <button
                type="button"
                className="pf-modal__close"
                aria-label="Close"
                onClick={() => setEditing(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form className="gx-form-grid" onSubmit={saveProfile}>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First name"
              />
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last name"
              />
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
              />
              <button type="submit" className="gx-btn gx-btn--primary" disabled={pending}>
                {pending ? "Saving..." : "Save profile"}
              </button>
            </form>

            <div className="pf-modal__divider" />

            <form className="gx-form-grid" onSubmit={savePassword}>
              <h2 className="section-title">Change password</h2>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Current password"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New password"
              />
              <button type="submit" className="gx-btn gx-btn--ghost">
                Update password
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
