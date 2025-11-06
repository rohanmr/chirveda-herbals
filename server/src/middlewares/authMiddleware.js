// const jwt = require("jsonwebtoken");

// module.exports = (req,res,next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if(!token) return res.status(401).json({error:"No token"});

//   try{
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   }catch(err){
//     return res.status(401).json({error:"Invalid token"});
//   }
// }


const jwt = require("jsonwebtoken");
const { User } = require("../models");
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

exports.protect = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  if (token.startsWith("Bearer ")) token = token.slice(7, token.length);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

