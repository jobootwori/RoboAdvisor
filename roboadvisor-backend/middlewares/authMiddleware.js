const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    console.error("❌ Unauthorized: No token provided or invalid format.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    token = token.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.error("❌ User not found for token:", decoded.id);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ Authenticated User:", req.user.id);

    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
