const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/me", auth, (req, res) => {
    res.json({
        message: "인증 성공",
        user: req.user,
    });
});

module.exports = router;