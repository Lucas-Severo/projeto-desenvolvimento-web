const Produto = require('../model/Produto');

module.exports = {
    async index(req, res) {
        const produtos = await Produto.findAll();
        return res.status(200).json({produtos});
    },

    async create(req, res) {
        const produto = req.body;
        
        try {
            const novoProduto = await Produto.create(produto);
            return res.json(novoProduto);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const produto = req.body;

        try {
            const novoProduto = await Produto.update(produto, {
                where: {
                    id
                }
            });

            if(novoProduto[0] === 0) throw new Error('produto nao encontrado');

            return res.status(200).json({ novoProduto });
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            const produto = await Produto.destroy({
                where: {
                    id
                }
            });

            if(produto === 0) throw new Error('produto nao encontrado');

            return res.status(204).send();
        } catch(error) {
            return res.status(400).send({error: error.message});
        }
    }
}