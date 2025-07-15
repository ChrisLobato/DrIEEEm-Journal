const express = require("express");
const { getUser, postEntry} = require("../controllers/journalController");
const { authMiddleware } = require("../middleware/auth");
let router = express.Router();

//see implementation in journalController

router.get("/user/:user", authMiddleware, getUser);
router.post("/entry/:userId",authMiddleware, postEntry);

module.exports = router
