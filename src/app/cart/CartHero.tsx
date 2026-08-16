import Link from "next/link";

export default function CartHero() {
  return (
    <header className="cart-hero">
      <div className="container cart-hero__inner">
        <h1 className="cart-hero__title">Your Cart</h1>
        <nav className="breadcrumb cart-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-item cart-breadcrumb__current">Your Cart</span>
        </nav>
      </div>
    </header>
  );
}
