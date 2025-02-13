const { generateOTP } = require('../utils/generateOtp');
const { sendOTPEmail } = require('../utils/emailService');

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ✅ Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 min

    const user = await User.create({ name, email, password, otp, otpExpires });

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save(); // ✅ Save OTP to database
    
    console.log("User Created:", user); // Log the user

    // ✅ Send OTP via Email
    await sendOTPEmail(email, otp);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Prevent login if email is not verified
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your email before logging in." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    console.log("User Found:", user); // Log the user

    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Debugging: Check OTP values
        console.log("Received OTP:", otp, "Stored OTP:", user.otp, "Expires:", user.otpExpires);

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route  GET /api/auth/me (Protected)
exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};
