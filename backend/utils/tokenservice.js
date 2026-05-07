const jwt = require("jsonwebtoken")
// generate token fucntion

const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}

module.exports = {generateTokens}