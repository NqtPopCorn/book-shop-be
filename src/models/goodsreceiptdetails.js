const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const goodsreceiptdetails = sequelize.define(
    "goodsreceiptdetails",
    {
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "books",
          key: "book_id",
        },
      },
      receipt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "goodsreceipt",
          key: "receipt_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "goodsreceiptdetails",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "book_id" }, { name: "receipt_id" }],
        },
        {
          name: "receipt_id",
          using: "BTREE",
          fields: [{ name: "receipt_id" }],
        },
      ],
    }
  );

  goodsreceiptdetails.associate = function (models) {
    goodsreceiptdetails.belongsTo(models.books, {
      foreignKey: "book_id",
    });
    goodsreceiptdetails.belongsTo(models.goodsreceipt, {
      foreignKey: "receipt_id",
    });
  };

  return goodsreceiptdetails;
};
