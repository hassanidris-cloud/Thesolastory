import { useEffect, useMemo, useState } from "react";

const UNIT_PRICE = 9;
const COMPARE_PRICE = 12;
const IS_SOLD_OUT = true;

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartNotice, setCartNotice] = useState("");

  const subtotal = useMemo(() => (UNIT_PRICE * quantity).toFixed(2), [quantity]);

  const addToCart = () => {
    if (IS_SOLD_OUT) {
      setCartNotice("Batch 01 is sold out. Join the Batch 02 waitlist.");
      return;
    }
    const nextQty = cartQty + quantity;
    setCartQty(nextQty);
    window.localStorage.setItem("solaCartQty", String(nextQty));
    setCartNotice(`${quantity} item${quantity > 1 ? "s" : ""} added to cart.`);
  };

  const submitOrder = (event) => {
    event.preventDefault();
    if (IS_SOLD_OUT) {
      setCartNotice("Purchasing is currently closed. Join the Batch 02 waitlist.");
      return;
    }
    if (cartQty < 1) {
      setCartNotice("Add this product to cart before proceeding to checkout.");
      return;
    }
    setPlaced(true);
  };

  useEffect(() => {
    const stored = Number(window.localStorage.getItem("solaCartQty") ?? "0");
    if (Number.isFinite(stored) && stored > 0) {
      setCartQty(stored);
    }
  }, []);

  return (
    <main className="purchase-page">
      <div className="grain-overlay" aria-hidden="true" />

      <header className="purchase-header">
        <a href="/" className="brand-mark">
          <img src="/assets/sola-logo.png" alt="The Sola Story logo" />
          <span>The Sola Story</span>
        </a>
        <a href="/" className="access-link">
          Back to Story
        </a>
        <p className="purchase-cart">Cart: {cartQty}</p>
      </header>

      <section className="purchase-layout section">
        <article className="purchase-media reveal is-visible">
          <img
            src="/assets/product-bottle.jpg"
            alt="The Sola Story Signature 16-Spice Blend"
          />
        </article>

        <article className="purchase-details reveal is-visible">
          <p className="eyebrow">Purchase</p>
          <h1 className="purchase-title">
            The Sola Story: Signature 16-Spice Blend
          </h1>
          <p className="purchase-review">★★★★★ 28 reviews</p>
          <p className="purchase-review-count">28 reviews</p>
          {IS_SOLD_OUT && <p className="sold-out-note">Batch 01 sold out - waitlist only</p>}
          <p className="purchase-price">
            <span className="sale">Sale price ${UNIT_PRICE.toFixed(2)} USD</span>
            <span className="regular">Regular price ${COMPARE_PRICE.toFixed(2)} USD</span>
          </p>
          <h2 className="purchase-tagline">16 Spices. 30 Years. One Sacred Ratio.</h2>
          <p className="purchase-copy">
            For three decades, these spices were the aroma in my family kitchen,
            and the soul of every meal at our dining table. Curated by my mother,
            Fatema, this isn't just a spice blend; it's a lifetime of culinary
            intuition captured in a bottle. Whether you're seasoning your avocado
            toast, marinating chicken, or finishing a bowl of dal, Sola is the
            only bottle you need to reach for.
          </p>

          <form className="checkout-card" onSubmit={submitOrder}>
            <label htmlFor="quantity">Quantity</label>
            <div className="quantity-row">
              <button
                type="button"
                disabled={IS_SOLD_OUT}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max="12"
                value={quantity}
                disabled={IS_SOLD_OUT}
                onChange={(event) => {
                  const parsed = Number(event.target.value);
                  if (!Number.isFinite(parsed)) return;
                  setQuantity(Math.max(1, Math.min(12, parsed)));
                }}
              />
              <button
                type="button"
                disabled={IS_SOLD_OUT}
                onClick={() => setQuantity((value) => Math.min(12, value + 1))}
              >
                +
              </button>
            </div>

            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              required
              disabled={IS_SOLD_OUT}
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              disabled={IS_SOLD_OUT}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            <label htmlFor="address">Shipping address</label>
            <textarea
              id="address"
              required
              disabled={IS_SOLD_OUT}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Street, city, postal code"
            />

            <div className="checkout-summary">
              <span>Subtotal</span>
              <strong>${subtotal} USD</strong>
            </div>
            <div className="checkout-summary">
              <span>Items in cart</span>
              <strong>{cartQty}</strong>
            </div>

            {cartNotice && <p className="cart-notice">{cartNotice}</p>}

            <button
              type="button"
              className="btn btn-ghost"
              onClick={addToCart}
              disabled={IS_SOLD_OUT}
            >
              Add to Cart
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={IS_SOLD_OUT || cartQty < 1}
            >
              Complete Purchase
            </button>
            <a href="/#waitlist" className="btn btn-primary">
              Join Batch 02 Waitlist
            </a>
          </form>

          {placed && (
            <p className="order-note">
              Order received. We will confirm your Batch 02 purchase details by
              email shortly.
            </p>
          )}

          <section className="product-facts">
            <h3>The Flavor Profile:</h3>
            <p>
              Sola is an all-purpose masterpiece. It leads with warm, earthy notes
              of hand-roasted cumin and coriander, followed by a bright, zesty
              lift that cuts through richness. It transitions into the subtle
              sweetness of cardamom and cinnamon, finishing with a sophisticated,
              lingering kick that warms the palate without overpowering the dish.
              It's savory and nostalgic, with just enough fire to keep you coming
              back for more.
            </p>

            <h3>The Details:</h3>
            <ul className="product-details-list">
              <li>
                <strong>Small Batch:</strong> Hand-blended and bottled with love.
              </li>
              <li>
                <strong>Volume:</strong> 3.5 oz, 100g
              </li>
              <li>
                <strong>Ingredients:</strong> A blend of 16 premium spices including
                Cumin, Coriander, Turmeric, and Cardamom. (No fillers, no
                anti-caking agents, no nonsense).
              </li>
              <li>
                <strong>Packaging:</strong> Lightweight, shatterproof bottles -
                perfect for preserving freshness and ensuring safe transit to your
                kitchen.
              </li>
            </ul>

            <p className="batch-note">
              NOTE: BATCH 01 IS SOLD OUT. JOIN THE BATCH 02 WAITLIST.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}

export default ProductPage;
