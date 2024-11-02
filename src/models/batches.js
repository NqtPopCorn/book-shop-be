const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const batches = sequelize.define(
    "batches",
    {
      book_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "books",
          key: "book_id",
        },
      },
      receipt_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "goodsreceipt",
          key: "receipt_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "batches",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          fields: [{ name: "book_id" }, { name: "receipt_id" }],
        },
        {
          name: "receipt_id",
          using: "BTREE",
          fields: [{ name: "receipt_id" }],
        },
        {
          name: "book_id",
          using: "BTREE",
          fields: [{ name: "book_id" }],
        },
      ],
    }
  );

  batches.associate = function (models) {
    batches.belongsTo(models.books, {
      foreignKey: "book_id",
    });
    batches.belongsTo(models.goodsreceipt, {
      foreignKey: "receipt_id",
    });
  };

  return batches;
};
