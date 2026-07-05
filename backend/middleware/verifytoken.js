const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No token provided."
        });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store payload in request
        req.user = decoded;

        // Continue to next middleware/route
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};

module.exports = verifyToken;