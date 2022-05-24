const Sequelize = require('sequelize');
const sequelize = require('../utilis/database');
const database = require('../utilis/database');

const Product = database.define('category', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    productName: Sequelize.STRING,
    productPrice: Sequelize.DOUBLE,
    productPhoto: sequelize
})

module.exports = Product;