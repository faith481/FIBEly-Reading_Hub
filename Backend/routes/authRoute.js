const express = require("express");
const aRouter = express.Router();
const userAuth = require("../userAuth/authUser");
//const userauth = require("../userAuth/authUser");

aRouter.post("/signup", userAuth.signup);
aRouter.post("/login", userAuth.login);
aRouter.post("/logout", userAuth.logout);

module.exports = aRouter;
