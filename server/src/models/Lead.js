const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your Sequelize instance

const Lead = sequelize.define("Lead", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  visitedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "visited_at", // optional: snake_case in DB
  },
});

module.exports = Lead;
