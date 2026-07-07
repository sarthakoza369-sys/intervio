const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.use(express.json()) // use this as MIDDLEWARE if u r using req.body

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Intervio backend listening on port ${port}`);
});