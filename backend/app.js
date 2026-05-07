require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const app = express();
const Authrouter = require("./routes/Authroutes")
const UserRouter = require("./routes/UserRoutes")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/api/auth" , Authrouter)
app.use("/api/user" ,UserRouter)

module.exports = app;