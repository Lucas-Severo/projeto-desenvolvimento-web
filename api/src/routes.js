const express = require('express');
const routes = express.Router();

const ProdutoController = require('./controllers/ProdutoController');

routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.findById);
routes.post('/produtos', ProdutoController.create);
routes.put('/produtos/:id', ProdutoController.update);
routes.put('/produtos/:id/vender', ProdutoController.sell);
routes.delete('/produtos/:id', ProdutoController.delete);

module.exports = routes;