import React from "react";

const demoProducts = [
	{
		id: 1,
		name: "Noise-Cancelling Headphones",
		price: 1999,
		img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
	},
	{
		id: 2,
		name: "4K Action Camera",
		price: 24999,
		img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
	},
	{
		id: 3,
		name: "Smartwatch Pro",
		price: 1599,
		img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
	},
	{
		id: 4,
		name: "Wireless Speaker",
		price: 899,
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
					<a href="#trending" className="btn primary">
						Explore Deals
					</a>
				</div>
				<div className="hero-art" />
			</section>

			<section id="trending" className="grid">
				{demoProducts.map((p) => (
					<article key={p.id} className="card">
						<div className="thumb" style={{ backgroundImage: `url(${p.img})` }} />
						<div className="info">
							<h3>{p.name}</h3>
							<p className="muted">Rs. {p.price}</p>
							<button className="btn add" onClick={() => addToCart(p)}>
								Add to Cart
							</button>
						</div>
					</article>
				))}
			</section>
		</div>
	);
}
