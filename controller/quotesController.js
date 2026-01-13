const Quotes = require("../models/quotesModel");

// Quotes Side
exports.quotesSide = async (req, res) => {
  const quotes = await Quotes.find();
  res.render("quotes", { quotes });
};

// :brukernavn Quotes Side
exports.brukernavnQuotesSide = async (req, res) => {
  const { brukernavn } = req.params;
  const brukernavnQuotes = await Quotes.find({ brukernavn });
  res.render("bruker", { brukernavnQuotes });
};

// Save, Edit, and Delete Quotes Controller

// GET
exports.visLagresitaterSide = async (req, res) => {
  const usersQuotes = await Quotes.find({ brukernavn: req.session.user });

  const error = req.session.error;
  req.session.error = null; // Clear after displaying
  res.render("lagresitater", { error, quotes: usersQuotes });
};

// POST
exports.handleLagresitater = async (req, res) => {
  try {
    const { quotes } = req.body;

    if (req.body.quotes.length < 10) {
      req.session.error = "Quote cannot be shorter than 10 characters!";

      return res.redirect("/lagresitater");
    } else if (req.body.quotes.length > 500) {
      req.session.error = "Quote cannot be longer than 500 characters!";

      return res.redirect("/lagresitater");
    } else {
      const nyQuotes = new Quotes({ quotes, brukernavn: req.session.user });

      await nyQuotes.save();

      console.log("Quotes saved successfully");

      res.redirect("/");
    }
  } catch (error) {
    console.error("Error saving quotes:", error);
    res.send("Server error");
  }
};

// EDIT QUOTES
exports.endreSitater = async (req, res) => {
  try {
    const { id } = req.params;
    const { quotes } = req.body;
    await Quotes.findByIdAndUpdate(id, { quotes });
    console.log("Quotes updated successfully");
    res.redirect("/lagresitater");
  } catch (error) {
    console.error("Error updating quotes:", error);
    res.send("Server error");
  }
};

// DELETE
exports.slettSitater = async (req, res) => {
  try {
    const { id } = req.params;
    await Quotes.findByIdAndDelete(id);
    console.log("Quotes deleted successfully");
    res.redirect("/lagresitater");
  } catch (error) {
    console.error("Error deleting quotes:", error);
    res.send("Server error");
  } 
};