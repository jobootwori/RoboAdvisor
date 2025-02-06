const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password'); // ✅ Attach user data to req

            next();
        } catch (error) {
            res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Unauthorized - No Token' });
    }
    
    // let token = req.headers.authorization;
    // if (!token || !token.startsWith('Bearer ')) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }

    // try {
    //     token = token.split(' ')[1]; // Extract token
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = await User.findById(decoded.id).select('-password');
    //     next();
    // } catch (error) {
    //     res.status(401).json({ error: 'Invalid token' });
    // }
};

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};
