// Imports
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/auth");

// Router Setup
const express = require("express");
const router = express.Router();

// Routes
router.get("/signin", authMiddleware.redirectIfLoggedIn, userController.visSignInSide);
router.post("/signin", userController.handleSignIn);
router.get("/signup", authMiddleware.redirectIfLoggedIn, userController.visSignUpSide);
router.post("/signup", userController.handleSignUp);
router.get("/logout", userController.handleLogout);

// Export Router
module.exports = router;
