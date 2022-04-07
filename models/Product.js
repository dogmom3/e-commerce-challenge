// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');
// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
     allowNull: false,
     validate: {len: [1, 256]}
    },

     price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
        validate: {min: 0, isDecimal: true}
      },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {min: 0, isInt: true}
      },

     category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Category,
          key: 'id',
        }
      },

    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
