// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");
// const User = require("./User");

// const Order = sequelize.define("Order", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

//   // Your internal order ID
//   orderId: { type: DataTypes.STRING, allowNull: false, unique: true },

//   // Razorpay fields
//   razorpayOrderId: { type: DataTypes.STRING },
//   razorpayPaymentId: { type: DataTypes.STRING },
//   razorpaySignature: { type: DataTypes.STRING },

//   items: { type: DataTypes.JSON, allowNull: false },
//   totalAmount: { type: DataTypes.FLOAT, allowNull: false },

//   // PENDING / SUCCESS / FAILED
//   status: { type: DataTypes.STRING, defaultValue: "PENDING" },

//   email: { type: DataTypes.STRING, allowNull: false },

//   date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// });

// // Relations (optional)
// User.hasMany(Order, { foreignKey: "userId" });
// Order.belongsTo(User, { foreignKey: "userId" });

// module.exports = Order;


const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  // internal order id
  orderId: { type: DataTypes.STRING, allowNull: false, unique: true },

  // Razorpay fields (not used for manual UPI)
  razorpayOrderId: { type: DataTypes.STRING },
  razorpayPaymentId: { type: DataTypes.STRING },
  razorpaySignature: { type: DataTypes.STRING },

  // Manual UPI fields
  upiIdUsed: { type: DataTypes.STRING },
  paymentMethod: { type: DataTypes.STRING },  
  paidAt: { type: DataTypes.DATE },

  items: { type: DataTypes.JSON, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },

  status: { type: DataTypes.STRING, defaultValue: "PENDING" },

  email: { type: DataTypes.STRING, allowNull: false },

  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Relations
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;


