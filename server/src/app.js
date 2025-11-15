


const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes"); 
const addressRoutes = require("./routes/addressRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes 
app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes); // <- mount leads route

app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api", adminRoutes);

app.use("/api/address", addressRoutes);
// Test DB connection and sync
sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

sequelize.sync({ alter: true })
  .then(() => console.log("Models synced"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
