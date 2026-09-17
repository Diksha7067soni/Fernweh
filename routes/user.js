const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

//signup routes
router.route("/signup").get(userController.renderSignup).post(wrapasync(userController.signup));

//login routes
router.route("/login").get(userController.renderLogin).post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    wrapasync(userController.login));
//logout route
router.get("/logout", userController.logout);
module.exports = router;