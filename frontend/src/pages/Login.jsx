import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
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
        (import.meta.env.VITE_API_URL || "http://localhost:4000") + "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.msg || "Login failed");
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
        <h2>Welcome back</h2>
        <p className="muted">Log in to continue</p>

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
          {busy ? "Logging in…" : "Log In"}
        </button>

        <p className="muted small">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
