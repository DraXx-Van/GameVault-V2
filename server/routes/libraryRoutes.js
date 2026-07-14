const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToLibrary } = require("../controllers/libraryController");
const router = express.Router();

router.post("/", protect, addToLibrary);

module.exports = router;
