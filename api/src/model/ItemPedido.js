const Sequelize = require('sequelize');

const connection = require('./connection');

const Pedido = require('./Pedido');
const Produto = require('./Produto');

const ItemPedido = connection.define('ItemPedido', {

    id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Pedido',
            key: 'id'
        },
        validate: {
            notNull: { msg: "código do pedido é obrigatório" },
        },
    },

    id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Produto',
            key: 'id'
        },
        validate: {
            notNull: { msg: "código do produto é obrigatório" },
        },
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "quantidade do produto é obrigatório" },
        },
    }

});

async function createTable() {
    await Produto.sync();
    await Pedido.sync();
    await ItemPedido.sync();
}

createTable();

module.exports = ItemPedido;