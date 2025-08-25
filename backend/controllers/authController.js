import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Helper: create token and set cookie
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "1d", // 👈 1 day expiry
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production", // only https in prod
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
	});

	return token;
};

// REGISTER
export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// check if user already exists
		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ msg: "Email already exists" });

		// create new user (password is hashed by model middleware)
		const user = await User.create({ name, email, password });

		// generate token
		generateTokenAndSetCookie(user._id, res);

		res.json({
			msg: "User registered",
			user: { id: user._id, email: user.email, name: user.name },
		});
	} catch (err) {
		console.error("Register error:", err);
		res.status(500).json({ msg: "Server error" });
	}
};

// LOGIN
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// find user
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: "Invalid credentials" });

		// compare password with hashed
		const isMatch = await user.comparePassword(password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

		// generate token
		generateTokenAndSetCookie(user._id, res);

		res.json({
			msg: "Login successful",
			user: { id: user._id, email: user.email, name: user.name },
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ msg: "Server error" });
	}
};

// LOGOUT
export const logout = (req, res) => {
	res.clearCookie("token");
	res.json({ msg: "Logged out" });
};

// GET USER (Auto-login check)
export const getMe = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ msg: "No token" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select("-password");

		if (!user) return res.status(401).json({ msg: "Invalid token" });

		res.json({ user });
	} catch (err) {
		console.error("GetMe error:", err);
		res.status(401).json({ msg: "Unauthorized" });
	}
};
