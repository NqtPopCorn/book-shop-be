const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
    account_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    otp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    otp_exprire: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'accounts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
      {
        name: "role_id",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};
