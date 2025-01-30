const express = require('express');
const bodyParser = require('body-parser');
const cartAPI = require('./src/cartAPI'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/cart', cartAPI);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server;
