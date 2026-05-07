const express = require('express');
const router = express.Router();
const User = require("../Contollers/UserContoller")
const Protect = require("../Middleware/AuthMiddleware");

router.get("/get-profile" , Protect , User.GetProfile);

module.exports = router;