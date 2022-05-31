const Sequelize = require('sequelize');
const database = require('../utilis/database');

const Category = database.define('category', {
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: Sequelize.STRING,
})

module.exports = Category;