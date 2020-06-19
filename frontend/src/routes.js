const express = require('express');
const routes = express.Router();

const api = require('./services/api');

routes.get('/produtos', async (req, res) => {

    const produtos = await api.get('/produtos');

    const products = produtos.data.produtos.sort((a, b) => {
        return a.id - b.id;
    });

    return res.render('index.html', {produtos: products});
});

routes.get('/produtos/:id/vender', async (req, res) => {
    const { id } = req.params;

    try {
        await api.put(`/produtos/${id}/vender`);
    } catch(error) {
        console.log(error.message);
    }

    return res.redirect('/produtos');
});

routes.get('/produtos/:id/alterar', async (req, res) => {
    const { id } = req.params;

    const produto = await api.get(`/produtos/${id}`);

    return res.render('atualizar.html', {produto: produto.data.produtoCont});
});

routes.post('/salvar', async (req, res) => {
    const id = req.body.id;

    await api.put(`/produtos/${id}`, req.body);

    return res.redirect('/produtos');
});

routes.get('/produtos/:id/excluir', async (req, res) => {
    const { id } = req.params;

    try {
        await api.delete(`/produtos/${id}`);
    } catch(error) {
        console.log(error.message);
    }

    return res.redirect('/produtos');
});

module.exports = routes;