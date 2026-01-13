const User = require("../models/userModel");
const argon2 = require("argon2");

// Sign In Controller

// GET
exports.visSignInSide = async (req, res) => {
  const error = req.session.error;
  req.session.error = null; // Clear after displaying
  res.render("signin", { error });
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
        req.session.error = "Passwords is incorrect!";
        res.redirect("/signin");
      }
    } else {
      req.session.error = "username does not exist!";
      res.redirect("/signin");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.send("Server error");
  }
};

// Sign Up Controller

// GET
exports.visSignUpSide = async (req, res) => {
  const error = req.session.error;
  req.session.error = null; // Clear after displaying
  res.render("signup", { error });
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
        const nyBruker = await new User({
          brukernavn,
          passord: hashedPassword,
        });
        await nyBruker.save();
        res.redirect("/signin");
      } else {
        req.session.error = "Passwords do not match!";
        res.redirect("/signup");
      }
    }
  } catch (error) {
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
