import {
  Gamepad2,
  MessageSquare,
  ShieldCheck,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ActivityIcon, UserActivity } from "../_data/dashboard.mock";

const ACTIVITY_ICONS: Record<ActivityIcon, LucideIcon> = {
  user: UserPlus,
  order: ShoppingCart,
  game: Gamepad2,
  review: MessageSquare,
  role: ShieldCheck,
};

type UserActivitiesProps = {
  activities: UserActivity[];
};

export default function UserActivities({ activities }: UserActivitiesProps) {
  return (
    <article className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">User Activities</h2>
        <a href="#" className="dash-view-all">
          View All
        </a>
      </div>

      <ul className="dash-activity-list">
        {activities.map((activity) => {
          const Icon = ACTIVITY_ICONS[activity.icon];

          return (
            <li key={activity.id} className="dash-activity">
              <span className="dash-activity__icon">
                <Icon size={15} />
              </span>
              <div className="dash-activity__info">
                <p className="dash-activity__title">{activity.title}</p>
                <p className="dash-activity__detail">{activity.detail}</p>
              </div>
              <time className="dash-activity__time">{activity.time}</time>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
