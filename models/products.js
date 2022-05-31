const Sequelize = require('sequelize');
const sequelize = require('../utilis/database');
const database = require('../utilis/database');

const Product = database.define('product', {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productName: Sequelize.STRING,
    productPrice: Sequelize.DOUBLE,
    productPhoto: Sequelize.STRING,
    productCategory: Sequelize.STRING
})

module.exports = Product;