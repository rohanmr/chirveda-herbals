const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.STRING, allowNull: false, unique: true },
  items: { type: DataTypes.JSON, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
  transactionId: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Relations
User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
