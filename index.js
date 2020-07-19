require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// create the express server
const app = express();

// config CORS
app.use(cors());

// read and parse body
app.use(express.json());

// database
dbConnection();

// routes
app.use( '/api/users', require('./routes/users'));
app.use( '/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => console.log('Port: ', process.env.PORT));
