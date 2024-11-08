const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const goodsreceipt = sequelize.define(
    "goodsreceipt",
    {
      receipt_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      provider_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "providers",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "goodsreceipt",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "receipt_id" }],
        },
        {
          name: "provider_id",
          using: "BTREE",
          fields: [{ name: "provider_id" }],
        },
      ],
    }
  );

  goodsreceipt.associate = (models) => {
    goodsreceipt.belongsTo(models.providers, { foreignKey: "provider_id" });
    goodsreceipt.belongsToMany(models.books, {
      as: "details",
      through: models.goodsreceiptdetails,
      foreignKey: "receipt_id",
      otherKey: "book_id",
    });
    goodsreceipt.hasMany(models.batches, {
      as: "batches",
      foreignKey: "receipt_id",
    });
    goodsreceipt.hasMany(models.goodsreceiptdetails, {
      as: "quantityDetails",
      foreignKey: "receipt_id",
    });
  };

  return goodsreceipt;
};
