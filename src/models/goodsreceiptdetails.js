const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goodsreceiptdetails', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'books',
        key: 'book_id'
      }
    },
    receipt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'goodsreceipt',
        key: 'receipt_id'
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
    subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'goodsreceiptdetails',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_id" },
          { name: "receipt_id" },
        ]
      },
      {
        name: "receipt_id",
        using: "BTREE",
        fields: [
          { name: "receipt_id" },
        ]
      },
    ]
  });
};
