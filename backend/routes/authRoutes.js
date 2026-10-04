const express = require("express");
const router = express.Router();

const{registerUser, loginUser} = require("../controllers/authController");
const{protect} = require("../middlewares/authMiddleware");
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", (req, res) =>{
    res.json({
        message: "protected route accessed",
        user: req.user,
    });
})

module.exports = router;