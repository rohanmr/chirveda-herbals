// const express = require("express");
// const router = express.Router();
// const { saveLeadEmail } = require("../controllers/leadController");

// router.post("/collect-email", saveLeadEmail);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { saveLeadEmail } = require("../controllers/leadController");

// POST /api/leads/collect-email
router.post("/collect-email", saveLeadEmail);

module.exports = router;

