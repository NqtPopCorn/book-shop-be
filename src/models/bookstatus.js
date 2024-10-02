const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookstatus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Đang bán, Ngưng bán, Sắp bán"
    }
  }, {
    sequelize,
    tableName: 'bookstatus',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
