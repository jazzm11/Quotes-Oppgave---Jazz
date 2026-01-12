// Package imports
const express = require('express');

// App Setup
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});