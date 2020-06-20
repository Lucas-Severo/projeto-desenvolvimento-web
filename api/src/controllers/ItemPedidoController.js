const ItemPedido = require('../model/ItemPedido');
const Produto = require('../model/Produto');

module.exports = {
    async index(req, res) {
        const pedidos = await ItemPedido.findAll();
        return res.status(200).json({ pedidos });
    },

    async findById(req, res) {
        const { id } = req.params;

        const pedido = await ItemPedido.findAll({
            where: {
                id_pedido: id
            }
        });

        if(pedido != null)
        {
            const pedidoCont = pedido;
            return res.status(200).json({ pedidoCont });
        }
        
        return res.status(400).json({ pedido });
    },

    async create(req, res) {
        const itemPedido = req.body;

        const produtoId = req.body.id_produto;
        const quantidade = req.body.quantidade;

        const produto = await Produto.findOne({
            where: {
                id: produtoId
            }
        });
        
        try {
            if(quantidade <= 0 || quantidade > produto.quantidade) {
                throw new Error('quantidade de produtos inválida. Há apenas ' + produto.quantidade + ' desse produto no estoque.');
            }

            const novoItemPedido = await ItemPedido.create(itemPedido);
            return res.status(201).json(novoItemPedido);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}