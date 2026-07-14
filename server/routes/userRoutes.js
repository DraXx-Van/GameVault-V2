const express = require("express");
const { registerUser, loginUser } = require("../controllers/authContoller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)

router.get("/me", protect, (req,res) => {
    res.status(200).json(req.user);
})

module.exports = router;