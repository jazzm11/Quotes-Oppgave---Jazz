const Quotes = require("../models/quotesModel");

// Save Quotes Controller

// GET
exports.visLagresitaterSide = async (req, res) => {
    res.render("lagresitater");
};

// POST
exports.handleLagresitater = async (req, res) => {
    try {
        const { quotes } = req.body;
        const nyQuotes = new Quotes({ quotes, brukernavn: req.session.user });
        await nyQuotes.save();
        console.log("Quotes saved successfully");
        res.redirect("/");
    } catch (error) {
        console.error("Error saving quotes:", error);
        res.send("Server error");
    }   
};

