const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('billpromotions', {
    billPromotion_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    conditional: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "số tiền áp dụng"
    },
    discount_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "1.TrucTiep, 2.PhanTram"
    },
    discount_value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'billpromotions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "billPromotion_id" },
        ]
      },
    ]
  });
};
