const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      deck: {type: DataTypes.ARRAY, allowNull: false },
      avatar: {type: DataTypes.STRING, allowNull: false},
      level: {type: DataTypes.INTEGER, allowNull: false},
    },
    { timestamps: false }
  );
};
