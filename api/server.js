const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const registresRoute = require('./routes/registres');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoute);
app.use('/registres', registresRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
