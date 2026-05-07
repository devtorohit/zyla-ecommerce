const User = require("../models/User");

module.exports.GetProfile = async (req, res) => {
    try {
        // come from middleware
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}