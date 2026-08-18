"use client";

import { useState } from "react";
import { Bell, Eye, Heart, Megaphone, type LucideIcon } from "lucide-react";

const PREFERENCES: {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  defaultOn: boolean;
}[] = [
  {
    key: "email",
    icon: Bell,
    title: "Email Notifications",
    description: "Receive updates about your games",
    defaultOn: true,
  },
  {
    key: "wishlist",
    icon: Heart,
    title: "Wishlist Notifications",
    description: "Get notified when wishlist items go on sale",
    defaultOn: true,
  },
  {
    key: "marketing",
    icon: Megaphone,
    title: "Marketing Emails",
    description: "Promotional offers and news",
    defaultOn: false,
  },
  {
    key: "visibility",
    icon: Eye,
    title: "Profile Visibility",
    description: "Allow others to view your profile",
    defaultOn: true,
  },
];

export default function PreferencesPanel() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PREFERENCES.map((item) => [item.key, item.defaultOn]))
  );

  return (
    <section className="pf-panel">
      <div className="pf-panel__head">
        <h2 className="pf-panel__title">Preferences</h2>
      </div>
      <div className="pf-pref">
        {PREFERENCES.map((item) => {
          const Icon = item.icon;
          const isOn = enabled[item.key];
          return (
            <div key={item.key} className="pf-pref__row">
              <div className="pf-pref__icon">
                <Icon size={18} />
              </div>
              <div className="pf-pref__text">
                <p className="pf-pref__title">{item.title}</p>
                <p className="pf-pref__desc">{item.description}</p>
              </div>
              <button
                type="button"
                className={`pf-toggle${isOn ? " is-on" : ""}`}
                aria-pressed={isOn}
                aria-label={`${item.title} ${isOn ? "on" : "off"}`}
                onClick={() =>
                  setEnabled((current) => ({ ...current, [item.key]: !current[item.key] }))
                }
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
