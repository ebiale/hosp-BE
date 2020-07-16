require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// create the express server
const app = express();

// config CORS
app.use(cors());

// database
dbConnection();

// routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'ahora si'
    });
});

app.listen(process.env.PORT, () => console.log('Port: ', process.env.PORT));
