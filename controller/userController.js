const User = require("../models/userModel");
const argon2 = require("argon2");

// Sign In Controller

// GET
exports.visSignInSide = async (req, res) => {
    res.render("signin");
};

// POST
exports.handleSignIn = async (req, res) => {
    try {
        const { brukernavn, passord } = req.body;
        const bruker = await User.findOne({ brukernavn: brukernavn });

        if (bruker) {
            const passordgyldig = await argon2.verify(bruker.passord, passord);

            if (passordgyldig) {
                // Session
                req.session.user = brukernavn;

                res.redirect("/");
                console.log("User logged in successfully");
            } else {
                return res.send("Invalid password");
            }
        } else {
            return res.send("User not found");
        } 
    }
    catch (error) {
    console.error("Error logging in user:", error);
    res.send("Server error");
    }
};  

// Sign Up Controller

// GET
exports.visSignUpSide = async (req, res) => {
    res.render("signup");
};

// POST
exports.handleSignUp = async (req, res) => {
    try {
        const { brukernavn, passord, repeatPassord } = req.body;
        const bruker = await User.findOne({ brukernavn: brukernavn });

        if (bruker) {
            return res.send("Username already exists");
        } else {
            if (passord === repeatPassord) {
                const hashedPassword = await argon2.hash(passord);
                const nyBruker = new User({ brukernavn, passord: hashedPassword });
                await nyBruker.save();
                res.redirect("/signin");
            } else {
                return res.send("Passwords do not match");
            }
        }
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.sendStatus(500).send("Internal Server Error");
    }
};

// Logout Controller
exports.handleLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Server error");
        }
        res.redirect("/signin");
    });
};