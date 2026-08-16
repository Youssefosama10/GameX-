import { Sparkles } from "lucide-react";

export default function UpgradeCard() {
  return (
    <div className="dash-upgrade">
      <div className="dash-upgrade__glow" aria-hidden="true" />
      <div className="dash-upgrade__icon">
        <Sparkles size={16} />
      </div>
      <h3 className="dash-upgrade__title">Upgrade to Pro</h3>
      <p className="dash-upgrade__text">
        Unlock premium features and take your store to the next level.
      </p>
      <button type="button" className="dash-upgrade__btn">
        Upgrade Now
      </button>
    </div>
  );
}
