const express = require('express');
const routes = express.Router();

routes.get('/produtos', (req, res) => {
    res.json({"Produtos": []});
});


module.exports = routes;