import GameImage from "@components/GameImage/GameImage";
import type { OrderStatus, RecentOrder } from "../_data/dashboard.mock";

const STATUS_LABEL: Record<OrderStatus, string> = {
  completed: "Completed",
  processing: "Processing",
  pending: "Pending",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

type RecentOrdersProps = {
  orders: RecentOrder[];
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <article className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">Recent Orders</h2>
        <a href="/dashboard/orders" className="dash-view-all">
          View All
        </a>
      </div>

      <ul className="dash-order-list">
        {orders.map((order) => (
          <li key={order.id} className="dash-order">
            <div className="dash-thumb">
              <GameImage
                src={order.image}
                alt={order.title}
                fill
                sizes="44px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="dash-order__info">
              <p className="dash-order__title">{order.title}</p>
              <p className="dash-order__id">{order.orderId}</p>
            </div>
            <div className="dash-order__meta">
              <p className="dash-order__price">{order.price}</p>
              <span className={`dash-badge dash-badge--${order.status}`}>
                {STATUS_LABEL[order.status]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
