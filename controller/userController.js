const { title } = require("process");
const User = require("../models/userModel");
const argon2 = require("argon2");

// Sign In Controller
exports.visSignInSide = async (req, res) => {
    res.render("signin");
};

exports.handleSignIn = async (req, res) => {
    try {
        const { brukernavn, passord } = req.body;
        const bruker = await User.findOne({ brukernavn: brukernavn });

        if (bruker) {
            const passordgyldig = await argon2.verify(bruker.passord, passord);

            if (passordgyldig) {
                res.redirect("/");
                console.log("User logged in successfully");
            } else {
                return res.status(400).render("signin", {
                    message: "Incorrect password",
                });
            }
        } else {
            return res.status(400).render("signin", {
                message: "Username does not exist",
            });
        } 
    }
    catch (error) {
    console.error("Error logging in user:", error);
    res.send("Server error");
    }
};  

// Sign Up Controller
exports.visSignUpSide = async (req, res) => {
    res.render("signup");
};

exports.handleSignUp = async (req, res) => {
    try {
        const { brukernavn, passord, repeatPassord } = req.body;
        const bruker = await User.findOne({ brukernavn: brukernavn });

        if (bruker) {
            return res.status(400).render("register", {
            message: "Username is already in use",
            });
        } else {
            if (passord === repeatPassord) {
                const hashedPassword = await argon2.hash(passord);
                const nyBruker = new User({ brukernavn, passord: hashedPassword });
                await nyBruker.save();
                res.redirect("/signin");
            } else {
                return res.status(400).render("register", {
                    message: "Passwords do not match",
                });
            }
        }
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.sendStatus(500).send("Internal Server Error");
    }
};


