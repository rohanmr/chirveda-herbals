// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Allow React UI
// app.use(cors({
//   origin: "http://localhost:5173", // your React port
//   credentials: true
// }));

// app.use(express.json());

// // Routes
// app.use("/auth", require("./routes/authRoutes")); // includes register, login, forgot-password, reset-password
// app.use("/lead", require("./routes/leadRoutes"));

// // Basic health check
// app.get("/", (req, res) => res.send("API is running"));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`API running on port ${PORT}`));



const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes"); // <-- import added
const addressRoutes = require("./routes/addressRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes); // <- mount leads route

app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", require("./routes/payment"));

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
