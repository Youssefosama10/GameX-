"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  GetNotificationsAction,
  GetUnreadCountAction,
  MarkAllNotificationsReadAction,
  MarkNotificationReadAction,
} from "@/API/actions";
import type { NotificationItem } from "@/API/types";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<NotificationItem[]>([]);

  async function load() {
    const [unread, list] = await Promise.all([GetUnreadCountAction(), GetNotificationsAction(1, 8)]);
    setCount(unread);
    setItems(list.notifications);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="gx-notify">
      <button type="button" className="nb-icon-btn" aria-label="Notifications" onClick={() => setOpen((value) => !value)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {count > 0 ? <span className="nb-badge">{count}</span> : null}
      </button>
      {open ? (
        <div className="gx-notify__menu">
          <div className="flex justify-between items-center mb-2">
            <strong>Notifications</strong>
            <button
              type="button"
              className="text-violet-400 text-sm"
              onClick={async () => {
                await MarkAllNotificationsReadAction();
                setCount(0);
                setItems((current) => current.map((item) => ({ ...item, isRead: true })));
              }}
            >
              Mark all read
            </button>
          </div>
          {items.length ? (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="block w-full text-left py-2 border-b border-white/5"
                onClick={async () => {
                  await MarkNotificationReadAction(item.id);
                  setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, isRead: true } : entry)));
                  setCount((value) => Math.max(0, value - (item.isRead ? 0 : 1)));
                }}
              >
                <span className="block font-semibold">{item.title}</span>
                <span className="block text-xs text-zinc-400">{item.message}</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-zinc-400">No notifications yet.</p>
          )}
          <Link href="/orders" className="block text-center text-violet-400 text-sm mt-2">
            View orders
          </Link>
        </div>
      ) : null}
    </div>
  );
}
