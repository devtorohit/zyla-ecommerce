const setCookie = (res, accessToken, refreshToken) => {
    const commonoption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    }

    res.cookie("accessToken", accessToken, {
        ...commonoption,
        maxAge: 15 * 60 * 1000,
    })

    res.cookie("refreshToken" , refreshToken , {
        ...commonoption,
        maxAge:7 * 24 * 60 * 60 * 1000,
    })
};

module.exports = { setCookie };