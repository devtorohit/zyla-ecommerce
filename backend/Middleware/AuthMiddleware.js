const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Protect = async (req, res, next) => {

    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "User no longer exists." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token expired" });
    }
}

module.exports = Protect