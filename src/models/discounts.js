const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const discounts = sequelize.define(
    "discounts",
    {
      discount_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      percent_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "discounts",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "discount_id" }],
        },
      ],
    }
  );

  discounts.associate = function (models) {
    discounts.belongsToMany(models.books, {
      through: models.bookdiscounts,
      foreignKey: "discount_id",
      otherKey: "book_id",
    });
  };

  return discounts;
};
