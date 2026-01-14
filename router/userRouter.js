// Imports
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth");

// Router Setup
const express = require("express");
const router = express.Router();

// Routes for User Authentication
router.get("/signin", authMiddleware.redirectIfLoggedIn, userController.visSignInSide);
router.post("/signin", userController.handleSignIn);
router.get("/signup", authMiddleware.redirectIfLoggedIn, userController.visSignUpSide);
router.post("/signup", userController.handleSignUp);
router.get("/logout", userController.handleLogout);

// Profile Route
router.get("/profile", authMiddleware.redirectIfLoggedOut, userController.visProfileSide);

// Export Router
module.exports = router;
