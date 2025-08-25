import React, { useState } from "react";

export default function Payment({ cart, total, clearCart }) {
  const [form, setForm] = useState({ name: "", card: "", exp: "", cvv: "" });
  const [status, setStatus] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const pay = (e) => {
    e.preventDefault();
    if (!cart.length) {
      setStatus("Your cart is empty.");
      return;
    }
    setStatus("Processing (demo)… ✅");
    setTimeout(() => {
      setStatus("Payment successful! 🎉");
      clearCart();
    }, 800);
  };

  return (
    <div className="payment-wrap">
      <div className="panel">
        <h2>Checkout</h2>
        <p className="muted small">Demo payment form (frontend only)</p>

        <div className="summary">
          <h4>Order Summary</h4>
          {cart.length ? (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No items in cart.</p>
          )}
          <div className="total">
            <span>Total</span>
            <span className="amt">${total}</span>
          </div>
        </div>

        <form className="pay-form" onSubmit={pay}>
          <label>Name on Card</label>
          <input name="name" value={form.name} onChange={onChange} required />

          <label>Card Number</label>
          <input
            name="card"
            placeholder="4242 4242 4242 4242"
            value={form.card}
            onChange={onChange}
            required
          />

          <div className="row">
            <div>
              <label>Expiry (MM/YY)</label>
              <input name="exp" value={form.exp} onChange={onChange} required />
            </div>
            <div>
              <label>CVV</label>
              <input name="cvv" value={form.cvv} onChange={onChange} required />
            </div>
          </div>

          <button className="btn primary">Pay Now</button>
          {status && <div className="alert">{status}</div>}
        </form>
      </div>
    </div>
  );
}
