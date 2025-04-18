const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  timestamps: true
});

// Define associations
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart; 