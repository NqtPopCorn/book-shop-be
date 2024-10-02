const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderdetails', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'books',
        key: 'book_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    discount_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bookdiscount',
        key: 'discount_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orderdetails',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
          { name: "book_id" },
        ]
      },
      {
        name: "book_id",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "discount_id",
        using: "BTREE",
        fields: [
          { name: "discount_id" },
        ]
      },
    ]
  });
};
