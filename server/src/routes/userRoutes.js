const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
      [name, email, hashedPassword]
    );

    return res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (r.rowCount === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = r.rows[0];

    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
