const Sequelize = require('sequelize');
const database = require('../utilis/database');

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    passcode: Sequelize.INTEGER,
    isApproved: { 
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }, 
    mobile: Sequelize.INTEGER
})

module.exports = User;