import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: EmptyStateProps) {
  return (
    <div className="gx-empty">
      <div className="gx-empty__card">
        <div className="gx-empty__badge" aria-hidden="true">
          <Icon size={36} strokeWidth={1.75} />
        </div>
        <h2 className="gx-empty__title">{title}</h2>
        <p className="gx-empty__text">{description}</p>
        <div className="gx-empty__actions">
          <Link href={ctaHref} className="gx-btn gx-btn--primary gx-btn--lg">
            {ctaLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link href={secondaryHref} className="gx-btn gx-btn--ghost gx-btn--lg">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
