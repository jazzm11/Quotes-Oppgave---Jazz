const Quotes = require("../models/quotesModel");

const randomQuote = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

const index = async (req, res) => {
  try {
    const quoteList = await Quotes.find();
    const quote = randomQuote(quoteList);
    res.render("index", { quote });
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

module.exports = {
  index,
};