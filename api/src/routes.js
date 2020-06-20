const express = require('express');
const routes = express.Router();

const ProdutoController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');
const ItemPedidoController = require('./controllers/ItemPedidoController');

// rotas para gerenciamento dos produtos
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.findById);
routes.post('/produtos', ProdutoController.create);
routes.put('/produtos/:id', ProdutoController.update);
routes.put('/produtos/:id/vender', ProdutoController.sell);
routes.delete('/produtos/:id', ProdutoController.delete);

// rotas para o gerenciamento dos pedidos
routes.get('/pedidos', PedidoController.index);
routes.get('/pedidos/:id', PedidoController.findById);
routes.post('/pedidos', PedidoController.create);

// rotas para o gerenciamento dos pedidos
routes.get('/items', ItemPedidoController.index);
routes.get('/items/:id', ItemPedidoController.findById);
routes.post('/items', ItemPedidoController.create);

module.exports = routes;