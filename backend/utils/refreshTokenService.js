const RefreshToken = require("../models/RefreshToken");

const handlerefreshToken = async function (userId , refreshToken) {

    const usertokens = await RefreshToken.find({userId}).sort({createdAt:1});

    if(usertokens.length >= 4){
        const oldtoken = usertokens[0]._id
        await RefreshToken.findByIdAndDelete(oldtoken)
    }

    await RefreshToken.create({userId , token:refreshToken})
}

module.exports = {handlerefreshToken}