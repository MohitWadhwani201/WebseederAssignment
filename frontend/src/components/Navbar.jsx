import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/auth.js";
import { FaStore, FaHistory } from "react-icons/fa"; // icons

export default function Navbar({ user, setUser, cartCount }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onLogout = async () => {
		await logout();
		setUser(null);
		navigate("/login");
	};

	const handleLogout = async () => {
		try {
			const res = await fetch("http://localhost:4000/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			if (res.ok) {
				localStorage.removeItem("user");
				onLogout();
				navigate("/login");
			} else {
				console.error("Logout failed:", await res.json());
			}
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<header className="nav">
			<div className="nav-inner">
				<Link to={user ? "/" : "/login"} className="brand">
					<span className="brand-dot">E</span>lectroMart
				</Link>

				<nav className="nav-links">
					{user ? (
						<>
							<Link className={pathname === "/" ? "active" : ""} to="/">
								Home
							</Link>
							<Link to="/shop" className={pathname === "/shop" ? "active" : ""}>
								<FaStore /> Shop
							</Link>
							<Link to="/history" className={pathname === "/history" ? "active" : ""}>
								<FaHistory /> History
							</Link>
							<Link to="/payment" className="cart">
								🛒 <span className="badge">{cartCount}</span>
							</Link>
							<button className="btn ghost" onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link className={pathname === "/login" ? "active" : ""} to="/login">
								Login
							</Link>
							<Link className={pathname === "/signup" ? "active" : ""} to="/signup">
								Sign Up
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
