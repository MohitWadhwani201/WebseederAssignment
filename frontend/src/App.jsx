import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { fetchUser } from "./utils/auth.js";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Payment from "./pages/Payment.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      const u = await fetchUser(); // checks cookie JWT via /me
      setUser(u);
      setBooting(false);
    })();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setToast({ type: "success", text: `${item.name} added to cart` });
    setTimeout(() => setToast(null), 1400);
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + (i.price || 0), 0),
    [cart]
  );

  if (booting) return <div className="boot">Loading…</div>;

  return (
    <>
      <Navbar user={user} setUser={setUser} cartCount={cart.length} />
      <main className="container">
        <Routes>
          {/* Public (auth pages only) */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute user={user}>
                <Payment cart={cart} total={cartTotal} clearCart={clearCart} />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>
      </main>

      {/* Tiny toast */}
      {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}
    </>
  );
}
