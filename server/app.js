const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const errorHandler = require('./components/helpers/errorHandler');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.use('/api/home', require('./components/home/home.controller'));  // home page raute
app.use('/api/history', require('./components/history/history.controller'));  // history page raute
app.use('/api/cart', require('./components/cart/cart.controller'));  // cart page raute

//global error handler
app.use(errorHandler);  
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));