const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goodsreceipt', {
    receipt_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'providers',
        key: 'id'
      }
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'goodsreceipt',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "receipt_id" },
        ]
      },
      {
        name: "provider_id",
        using: "BTREE",
        fields: [
          { name: "provider_id" },
        ]
      },
    ]
  });
};
