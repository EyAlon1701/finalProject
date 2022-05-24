const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'pop_store',
    'root',
    'admin',
    {
        dialect: 'mysql',
        host: 'localhost'
    }

);

module.exports = sequelize;