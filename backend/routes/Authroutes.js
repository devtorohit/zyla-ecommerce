const express = require('express');
const router = express.Router();
const Auth = require("../Contollers/AuthContoller");


router.post("/signup" , Auth.Register);
router.post("/login" , Auth.Login);
router.post("/logout" , Auth.Logout);
router.post("/refresh" ,Auth.RefreshToken);

module.exports = router;