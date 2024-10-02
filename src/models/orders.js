const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orderstatus',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    billPromotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'billpromotions',
        key: 'billPromotion_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "customer_id",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "status_id",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
      {
        name: "billPromotion_id",
        using: "BTREE",
        fields: [
          { name: "billPromotion_id" },
        ]
      },
    ]
  });
};
