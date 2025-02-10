const express = require('express');
const { registerUser, loginUser, verifyOTP } = require('../controllers/authController');
// const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);

// Protected route for user profile
// router.get('/me', protect, getUserProfile);


module.exports = router;
