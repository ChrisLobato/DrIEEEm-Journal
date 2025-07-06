const express = require("express");
const { getUser, postEntry} = require("../controllers/journalController");
const { authMiddleware } = require("../middleware/auth");
let router = express.Router();

//see implementation in journalController

router.get("/journal/getUser/:user", authMiddleware, getUser);
router.post("/journal/entry/:userId",authMiddleware, postEntry);

module.exports = router
