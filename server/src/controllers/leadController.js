// const pool = require("../config/db");

// exports.saveLeadEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "email required" });
//     }

//     await pool.query(
//       "INSERT INTO leads(email, visited_at) VALUES($1, NOW())",
//       [email]
//     );

//     res.json({ message: "lead saved" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "server error" });
//   }
// };


const Lead = require("../models/Lead");

exports.saveLeadEmail = async (req, res) => {
  try {
    console.log("Request body:", req.body); // debug
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const [lead, created] = await Lead.findOrCreate({
      where: { email },
      defaults: { email },
    });

    if (!created) {
      return res.status(200).json({ message: "Lead already exists" });
    }

    res.json({ message: "Lead saved successfully", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
