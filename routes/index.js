
const express = require("express");
const router = express.Router();

// HOME PAGE ROUTER
router.get("/", (req, res) => {
	res.send("Welcome to Nokshes API");
});

module.exports = router;
