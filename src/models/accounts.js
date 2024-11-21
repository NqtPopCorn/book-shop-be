const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const accounts = sequelize.define(
    "accounts",
    {
      account_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "role_id",
        },
        defaultValue: 3, //customer
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      otp: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      otp_exprire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "accounts",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "account_id" }],
        },
      ],
    }
  );

  accounts.associate = function (models) {
    accounts.belongsTo(models.roles, {
      as: "role",
      foreignKey: "role_id",
    });
  };

  return accounts;
};
