const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        console.log("========== AUTH DEBUG ==========");

        console.log("Authorization Header:", req.headers.authorization);

        let token;

        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        console.log("User:", user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log(err);

        return res.status(401).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = protect;