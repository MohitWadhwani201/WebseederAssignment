import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_URL || "http://localhost:4000") + "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.msg || "Signup failed");
      setUser(data.user);
      navigate("/");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <form className="panel" onSubmit={submit}>
        <h2>Create an account</h2>
        <p className="muted">Join ElectroMart in seconds</p>

        <label>Name</label>
        <input
          name="name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        {err && <div className="alert error">{err}</div>}

        <button className="btn primary" disabled={busy}>
          {busy ? "Creating…" : "Create account"}
        </button>

        <p className="muted small">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
