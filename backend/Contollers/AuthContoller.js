const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { generateTokens } = require("../utils/tokenservice");
const { handlerefreshToken } = require("../utils/refreshTokenService");
const { setCookie } = require("../utils/cookieService");
const jwt = require("jsonwebtoken");

// register controller

module.exports.Register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const emailexist = await User.findOne({ email })

        if (emailexist) {
            return res.status(400).json({ message: "Email already exist" })
        }

        const user = await User.create({ username, email, password });

        const { accessToken, refreshToken } = generateTokens(user._id);

        await handlerefreshToken(user._id, refreshToken);

        setCookie(res, accessToken, refreshToken)

        res.status(200).json({
            message: "User Registerd Succesfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: process.env.NODE_ENV === "development" ? error.message : undefined })
    }
}

// login contoller
module.exports.Login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({ message: "Email not found" })
        }

        const ismatch = await user.comparedPassword(password)

        if (!ismatch) {
            return res.status(401).json({ message: "Incorrect Password" })
        }

        const { accessToken, refreshToken } = generateTokens(user._id);

        await handlerefreshToken(user._id, refreshToken)

        setCookie(res, accessToken, refreshToken)
        return res.status(200).json({
            message: "Login SuccessFully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: process.env.NODE_ENV === "development" ? error.message : undefined })
    }
}

// RefreshToken or generate new  AccesToken

module.exports.RefreshToken = async (req, res) => {
    try {
        const rtoken = req.cookies.refreshToken;

        if (!rtoken) {
            return res.status(401).json({ message: "Session Expired" })
        }

        let decoded;
        try {
            decoded = jwt.verify(rtoken , process.env.JWT_REFRESH_SECRET)
        } catch (error) {
            return res.status(403).json({ message: "Invalid or expired refresh token" })
        }
        const storedToken = await RefreshToken.findOne({ token: rtoken });

        if (!storedToken) {
            return res.status(403).json({ message: "Token reused Security Alert" })
        }

        const user = await User.findById(decoded.id).select("_id username");

        if (!user) {
            await RefreshToken.deleteOne({ rtoken });
            return res.status(404).json({ message: "User no longer exists. Session cleared." });
        }

        await RefreshToken.findByIdAndDelete(storedToken._id);

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

        await handlerefreshToken(user._id, newRefreshToken);

        setCookie(res, accessToken, newRefreshToken);

        return res.status(200).json({ status: "Success", message: "Tokens refreshed" });
    } catch (error) {
        return res.status(500).json({ message: "Internal serveer error" })
    }
}

// logout contoller

module.exports.Logout = async (req, res) => {
    try {
        const rtoken = req.cookies.refreshToken

        if (rtoken) {
            await RefreshToken.findOneAndDelete({ token: rtoken })
        }
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        res.status(200).json({ message: "Logout SuccessFully" })
    } catch (error) {
        return res.status(500).json({ message: "Logout error", error: error.message })
    }
}
