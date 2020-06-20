const express = require('express');
const routes = express.Router();

const api = require('./services/api');

routes.get('/', async (req, res) => {
    return res.render('home.html');
});

// rotas para produtos

routes.get('/cadastrar', async (req, res) => {
    return res.render('salvar.html');
});

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

routes.post('/cadastrar', async (req, res) => {
    const id = req.body.id;

    if(req.body.desconto == 0)
        req.body.desconto = null;
    await api.post(`/produtos/`, req.body);

    return res.redirect('/produtos');
});

routes.post('/salvar', async (req, res) => {
    const id = req.body.id;

    if(req.body.desconto == 0)
        req.body.desconto = null;
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

// rotas para pedidos 
routes.get('/pedidos', async (req, res) => {

    const pedidos = await api.get('/pedidos');

    const pedidosOrdenados = pedidos.data.pedidos.sort((a, b) => {
        return a.id - b.id;
    });

    return res.render('pedidos.html', {pedidos: pedidosOrdenados});
});

routes.get('/pedidos/:id', async (req, res) => {
    const { id } = req.params;

    const produtos = await api.get(`/items/${id}`);

    const produtosOrdenados = produtos.data.pedidoCont.sort((a, b) => {
        return a.id - b.id;
    });

    let precoTotal = 0;

    for(produtoOrdenado of produtosOrdenados) {
        const p = await api.get(`/produtos/${produtoOrdenado.id_produto}`);

        produtoOrdenado['nome'] = p.data.produtoCont.nome;
        produtoOrdenado['preco'] = Number(p.data.produtoCont.preco);

        precoTotal += (p.data.produtoCont.preco * produtoOrdenado.quantidade);
    }

    return res.render('produtos_comprados.html', {produtos: produtosOrdenados, precoTotal});
});

routes.get('/pedido_cadastrar', async (req, res) => {
    const produtos = await api.get('/produtos');

    return res.render('pedidos_cadastrar.html', {produtos: produtos.data.produtos});
});

routes.post('/salvar_pedido', async (req, res) => {
    const nome = req.body.nome;
    const endereco = req.body.endereco;

    console.log(req.body);

    const pedido = await api.post('/pedidos', {nome, endereco});
    const id_pedido = pedido.data.id;

    if(req.body.produto.length == 1) {
        const id_produto = req.body.produto;
        const quantidade = req.body.quantidade;

        const data = {
            "id_pedido": id_pedido,
            "id_produto": id_produto,
            "quantidade": quantidade
        };

        await api.post('/items', data);
    } else {
        for(let i = 0; i < req.body.produto.length; i++) {
            const data = {
                "id_pedido": id_pedido,
                "id_produto": req.body.produto[i],
                "quantidade": req.body.quantidade[i]
            };
            await api.post('/items', data);
        }
    }

    return res.redirect('/pedidos');
});


module.exports = routes;