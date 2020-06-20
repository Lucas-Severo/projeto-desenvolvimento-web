const Sequelize = require('sequelize');

const connection = require('./connection');

const Produto = connection.define('Produto', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "nome é obrigatório" },
        },
    },

    preco: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notNull: { msg: "preço é obrigatório" },
        },
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "quantidade é obrigatório" },
        },
    },

    desconto: {
        type: Sequelize.DECIMAL,
        allowNull: true
    }

}, {
    freezeTableName: true
});

module.exports = Produto;
