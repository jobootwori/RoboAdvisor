const express = require('express');
const { registerUser, loginUser, verifyOTP, getUserProfile } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyotp', verifyOTP);
router.get('/me', authenticate, getUserProfile);


module.exports = router;
