const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  orderId: { type: DataTypes.STRING, allowNull: false, unique: true },

  razorpayOrderId: { type: DataTypes.STRING },
  razorpayPaymentId: { type: DataTypes.STRING },
  razorpaySignature: { type: DataTypes.STRING },

  items: { type: DataTypes.JSON, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },

  status: { type: DataTypes.STRING, defaultValue: "FAILED" },

  email: { type: DataTypes.STRING, allowNull: false },

  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: "ONLINE",
  },

  paidAt: { type: DataTypes.DATE },

  // Order created date
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Correct relation
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
