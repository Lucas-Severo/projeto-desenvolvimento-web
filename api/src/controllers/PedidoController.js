const Pedido = require('../model/Pedido');

module.exports = {
    async index(req, res) {
        const pedidos = await Pedido.findAll();
        return res.status(200).json({pedidos});
    },

    async findById(req, res) {
        const { id } = req.params;

        const pedido = await Pedido.findOne({
            where: {
                id
            }
        });

        if(pedido != null)
        {
            const pedidoCont = pedido.dataValues;
            return res.status(200).json({ pedidoCont });
        }
        
        return res.status(400).json({ pedido });
    },

    async create(req, res) {
        const pedido = req.body;
        
        try {
            const novoPedido = await Pedido.create(pedido);
            return res.status(201).json(novoPedido);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}