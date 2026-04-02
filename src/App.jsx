import { useEffect, useRef, useState } from "react";

const ASSETS = {
  product: "/assets/product-bottle.jpg",
  portrait: "/assets/fatema-portrait.png",
};

const stats = [
  { value: "800K+", label: "Followers" },
  { value: "127M+", label: "Views" },
  { value: "20+", label: "Years" },
  { value: "4000+", label: "Brides" },
];

const reviews = [
  {
    quote: "We are on our 7th bottle! It goes on everything and saves us so much time.",
    author: "Sarah M.",
    highlight: "We are on our 7th bottle!",
  },
  {
    quote: "This has officially become my favorite spice ever. I use it almost daily.",
    author: "Nadia K.",
    highlight: "My favorite spice ever.",
  },
  {
    quote: "This spice mix is AMAZING! It works with nearly every meal I make.",
    author: "Priya R.",
    highlight: "This spice mix is AMAZING!",
  },
  {
    quote: "I can't cook without this now. It instantly makes food feel complete.",
    author: "Amira T.",
    highlight: "I can't cook without this.",
  },
  {
    quote: "A staple in our home. We keep one in the pantry and one on the counter.",
    author: "Leila H.",
    highlight: "A staple in our home.",
  },
  {
    quote: "One spice bottle and can use in multiple recipes. Truly versatile.",
    author: "Mariam K.",
    highlight: "One spice. Endless recipes.",
  },
  {
    quote: "The aroma is incredible, and the flavors are so well-balanced.",
    author: "Sana A.",
    highlight: "The aroma is incredible.",
  },
  {
    quote: "It transforms any curry or soup into an amazing, flavor-packed dish.",
    author: "Hiba R.",
    highlight: "It transforms every curry or soup.",
  },
];

const flavorNotes = [
  "Warm, earthy notes of cumin and coriander",
  "Bright, zesty lift",
  "Subtle sweetness of cardamom and cinnamon",
  "A lingering, sophisticated heat",
];

const videos = [
  { id: "MyUgW4FhsnQ", title: "Cooking with Sola spice blend" },
  { id: "08WRwA0hNQo", title: "Quick marinade recipe with Sola" },
  { id: "_42YglrWc9o", title: "Dal curry made with Sola" },
  { id: "cnngmS29BCQ", title: "Finishing soups with Sola blend" },
  { id: "C5XayrEjX94", title: "Everyday cooking with Sola spice" },
];

function App() {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const productSlides = [
    ASSETS.product,
    "/assets/product-slide-1.png",
    "/assets/product-slide-2.png",
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealEls = document.querySelectorAll(".reveal");
    document.querySelectorAll(".hero .reveal").forEach((el) =>
      el.classList.add("is-visible")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((node) => observer.observe(node));

    if (prefersReducedMotion) return () => observer.disconnect();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          setHeroOffset(Math.max(-80, Math.min(80, rect.top * -0.07)));
        }
        setHeaderScrolled(window.scrollY > 60);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % productSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [productSlides.length]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── HEADER ── */}
      <header className={`site-header${headerScrolled ? " scrolled" : ""}`}>
        <a href="#top" className="brand-mark">
          <img src="/assets/sola-logo.png" alt="The Sola Story logo" />
          <span>The Sola Story</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#story">Story</a>
          <a href="#blend">Blend</a>
          <a href="/product">Product</a>
          <a href="#reviews">Reviews</a>
          <a href="#cook">Cook with Sola</a>
          <a href="#waitlist" className="nav-cta">Waitlist</a>
        </nav>
      </header>

      <main>
        {/* ── HERO — bottle is the star ── */}
        <section className="hero" id="top" ref={heroRef}>
          <div
            className="hero-bg hero-bg-blur"
            style={{
              backgroundImage: `url('${ASSETS.product}')`,
              transform: `translateY(${heroOffset * 0.55}px) scale(1.12)`,
            }}
          />
          <div
            className="hero-bg hero-bg-sharp"
            style={{
              backgroundImage: `url('${ASSETS.product}')`,
              transform: `translateY(${heroOffset}px)`,
            }}
          />
          <div className="hero-bottle-glow" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow reveal">سولہ (Sola) — Sixteen</p>
            <h1 className="reveal reveal-delay-1">
              Sixteen spices.<br />
              One story.
              <span>A sacred blend perfected over 30 years.<br />From our kitchen to yours.</span>
            </h1>
            <div className="hero-actions reveal reveal-delay-2">
              <a href="#waitlist" className="btn btn-primary">Join the Waitlist</a>
              <a href="#story" className="btn btn-ghost">Explore the Story</a>
            </div>
          </div>

          <div className="hero-scroll-hint reveal reveal-delay-3" aria-hidden="true">
            <span className="scroll-line" />
            <span className="scroll-label">Scroll</span>
          </div>
        </section>

        {/* ── PAUSE — slows the user down ── */}
        <section className="pause-section" aria-label="Brand statement">
          <p className="pause-line reveal reveal-delay-0"><em>16 spices.</em></p>
          <p className="pause-line reveal reveal-delay-1"><em>30 years.</em></p>
          <p className="pause-line pause-line--accent reveal reveal-delay-2">One sacred ratio.</p>
        </section>

        {/* ── SCARCITY ── */}
        <section className="section scarcity reveal">
          <p className="eyebrow">Limited Release</p>
          <h2>Batch 01 — Sold Out</h2>
          <p>
            Only 50 bottles were released. Every single one sold out.
            This isn't mass-produced. It's made in moments.
          </p>
          <a href="#waitlist" className="btn btn-primary">Join Batch 02</a>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="section social-proof reveal">
          {stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </article>
          ))}
        </section>

        {/* ── SECTION TRANSITION ── */}
        <div className="section-fade" aria-hidden="true" />

        {/* ── STORY — intimate moment ── */}
        <section className="story section" id="story">
          <div className="story-media reveal">
            <div className="story-media-inner">
              <img src={ASSETS.portrait} alt="Fatema, founder of The Sola Story" />
              <div className="story-media-overlay" aria-hidden="true" />
            </div>
            <div className="story-media-caption">
              <span>Fatema — Founder</span>
            </div>
          </div>
          <div className="story-copy reveal reveal-delay-1">
            <div className="accent-rule" aria-hidden="true" />
            <p className="eyebrow">The Heart Behind Sola</p>
            <h2>Her kitchen. Passed hand to hand.</h2>
            <p className="story-lead">
              For over three decades, Fatema perfected a blend of sixteen spices in her family kitchen.
            </p>
            <p>
              What began as a mother's intuition became something too meaningful to keep
              to one table. Today, that same sacred ratio reaches hundreds of thousands of homes.
            </p>
            <p className="story-signoff">— Zahabiya & Fatema</p>
          </div>
        </section>

        {/* ── SECTION TRANSITION ── */}
        <div className="section-fade section-fade--reverse" aria-hidden="true" />

        {/* ── PRODUCT SHOWCASE — the bottle as hero object ── */}
        <section className="product section" id="blend">
          <div className="product-spotlight" aria-hidden="true" />
          <div className="product-frame reveal">
            <div className="product-frame-glow" aria-hidden="true" />
            <div className="product-slideshow">
              {productSlides.map((slide, index) => (
                <figure
                  key={slide}
                  className={`product-slide${activeSlide === index ? " active" : ""}`}
                >
                  <img
                    src={slide}
                    alt="The Sola Story spice blend bottle and lifestyle moments"
                  />
                </figure>
              ))}
            </div>
            <div className="product-dots" role="tablist" aria-label="Product images">
              {productSlides.map((slide, index) => (
                <button
                  key={`dot-${slide}`}
                  type="button"
                  className={`product-dot${activeSlide === index ? " active" : ""}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-selected={activeSlide === index}
                />
              ))}
            </div>
          </div>
          <div className="product-copy reveal reveal-delay-1">
            <div className="accent-rule" aria-hidden="true" />
            <p className="eyebrow">Signature Blend</p>
            <h2>16 Spices.<br />30 Years.<br />One Sacred Ratio.</h2>
            <p>
              Crafted in small batches. This blend delivers warmth, complexity, and unmistakable
              character in a single spoon. Whether you're finishing avocado toast or building a
              slow curry — reach for one bottle.
            </p>
            <div className="product-details">
              <span>16 whole and ground spices</span>
              <span>Small batch crafted</span>
              <span>All-purpose for everyday meals</span>
            </div>
            <a href="#waitlist" className="btn btn-ghost">Join Batch 02</a>
          </div>
        </section>

        {/* ── FLAVOR PROFILE ── */}
        <section className="flavor section" id="flavor">
          <p className="eyebrow reveal">Flavor Profile</p>
          <div className="flavor-lines">
            {flavorNotes.map((note, i) => (
              <div className={`flavor-line reveal reveal-delay-${i}`} key={note}>
                <span className="flavor-index">0{i + 1}</span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRUST BREAK — resets attention before reviews ── */}
        <div className="trust-break reveal" aria-label="Social trust statement">
          <p>"A staple in thousands of kitchens."</p>
        </div>

        {/* ── REVIEWS ── */}
        <section className="section reviews" id="reviews">
          <div className="section-head reveal">
            <p className="eyebrow">Community Love</p>
            <h2>What people are saying</h2>
            <p>
              Real words from real kitchens - curated to the moments that matter
              most.
            </p>
          </div>

          <div className="featured-reviews reveal">
            {reviews.map((item, i) => (
              <article
                className={`featured-review featured-review--${(i % 4) + 1}`}
                key={item.highlight}
              >
                <p className="featured-quote">"{item.highlight}"</p>
                <p className="featured-author">- {item.author}</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-ghost reviews-toggle reveal"
            onClick={() => setShowAllReviews((value) => !value)}
            aria-expanded={showAllReviews}
          >
            {showAllReviews ? "Hide all reviews" : "Read all reviews"}
          </button>

          {showAllReviews && (
            <div className="full-reviews reveal is-visible">
              {reviews.map((item) => (
                <article className="full-review-row" key={item.quote}>
                  <p className="stars" aria-label="5 star rating">
                    ★★★★★
                  </p>
                  <p className="full-review-text">{item.quote}</p>
                  <p className="full-review-author">{item.author}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── COOK WITH SOLA — video showcase ── */}
        <section className="section video-showcase" id="cook">
          <div className="section-head reveal">
            <p className="eyebrow">Cook with Sola</p>
            <h2>Real dishes.<br />Real kitchens.<br />One blend.</h2>
          </div>
          <div className="video-grid">
            {videos.map((video, i) => (
              <div
                className={`video-card reveal reveal-delay-${i % 3}`}
                key={video.id}
              >
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&autoplay=0`}
                    title={video.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="video-badge" aria-hidden="true">Made using Sola</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MEDIA ── */}
        <section className="section media reveal">
          <article className="media-card">
            <div className="media-card-accent" aria-hidden="true" />
            <p className="eyebrow">Cookbook</p>
            <h3>Quick & Easy Dishes using Royal Spice Mix</h3>
            <a
              href="https://biteofjoy.gumroad.com/l/biteofjoy"
              target="_blank"
              rel="noreferrer"
              className="access-link"
            >
              View Cookbook →
            </a>
          </article>
          <article className="media-card">
            <div className="media-card-accent" aria-hidden="true" />
            <p className="eyebrow">Media</p>
            <h3>Bite of Joy on YouTube</h3>
            <a
              href="https://www.youtube.com/@BiteofJoy"
              target="_blank"
              rel="noreferrer"
              className="access-link"
            >
              Watch Channel →
            </a>
          </article>
        </section>

        {/* ── WAITLIST — invitation ── */}
        <section className="section waitlist reveal" id="waitlist">
          <div className="waitlist-glow" aria-hidden="true" />
          <div className="waitlist-inner">
            <p className="eyebrow">Next Release</p>
            <h2>Take a seat at our table.</h2>
            <p>
              Get early access to the next drop and stories from our journey.
              Batch 01 sold out. Batch 02 is coming.
            </p>
            <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn btn-primary">
                Join the Waitlist
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-brand">
          <p className="footer-name">The Sola Story</p>
          <p className="footer-tagline">Batch-crafted with heritage and heat.</p>
        </div>
        <p className="footer-copy">© 2024 The Sola Story. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
