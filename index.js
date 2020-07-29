require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

// create the express server
const app = express();

// config CORS
app.use(cors());

// read and parse body
app.use(express.json());

// database
dbConnection();

// public directory
app.use(express.static('public'));

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/globalSearch', require('./routes/globalSearch'));
app.use('/api/upload', require('./routes/uploads'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => console.log('Port: ', process.env.PORT));
