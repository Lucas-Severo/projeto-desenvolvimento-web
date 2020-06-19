const Produto = require('../model/Produto');

module.exports = {
    async index(req, res) {
        const produtos = await Produto.findAll();
        return res.status(200).json({produtos});
    },

    async findById(req, res) {
        const { id } = req.params;

        const produto = await Produto.findOne({
            where: {
                id
            }
        });

        if(produto != null)
        {
            const produtoCont = produto.dataValues;
            return res.status(200).json({ produtoCont });
        }
        
        return res.status(200).json({ produto });
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
            return res.status(400).send({message: error.message});
        }
    },

    async sell(req, res) {
        const { id } = req.params;

        try {
            const produto = await Produto.findOne({
                where: {
                    id
                }
            });

            if(produto != null) {
                const quantity = produto.quantidade;
                
                if(quantity === 0)
                    throw new Error('Produto esgotado');

                const produtoCont = produto.dataValues;

                produtoCont.quantidade -= 1;

                const id = produtoCont.id;

                const novoProduto = await Produto.update(produtoCont, {
                    where: {
                        id
                    }
                });

                return res.status(200).json({produtoCont});
            }

            return res.json({produto});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}