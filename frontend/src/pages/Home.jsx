import React from "react";

const demoProducts = [
  {
    id: 1,
    name: "Noise-Cancelling Headphones",
    price: 199,
    img: "https://images.unsplash.com/photo-1518448507242-3e3794f5fd0f?w=800&q=80",
  },
  {
    id: 2,
    name: "4K Action Camera",
    price: 249,
    img: "https://images.unsplash.com/photo-1519183071298-a2962be96f83?w=800&q=80",
  },
  {
    id: 3,
    name: "Smartwatch Pro",
    price: 159,
    img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
  },
  {
    id: 4,
    name: "Wireless Speaker",
    price: 89,
    img: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=800&q=80",
  },
];

export default function Home({ addToCart }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Shop the Latest in Electronics</h1>
          <p>Premium gadgets, curated deals, and a smooth shopping experience.</p>
          <a href="#trending" className="btn primary">Explore Deals</a>
        </div>
        <div className="hero-art" />
      </section>

      <section id="trending" className="grid">
        {demoProducts.map((p) => (
          <article key={p.id} className="card">
            <div className="thumb" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="info">
              <h3>{p.name}</h3>
              <p className="muted">${p.price}</p>
              <button className="btn add" onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
