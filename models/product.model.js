const Sequelize = require('sequelize');
const sequelize = require('../utils/sqldatabase');

/**
 * Product Model.
 */
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg'
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;