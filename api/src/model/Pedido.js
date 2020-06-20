const Sequelize = require('sequelize');

const connection = require('./connection');

const Pedido = connection.define('Pedido', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "nome do usuário é obrigatório" },
        },
    },

    endereco: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "endereço de entrega é obrigatório" },
        },
    }
}, {
    freezeTableName: true
});

module.exports = Pedido;
