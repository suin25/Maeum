const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET = "MY_SECRET_KEY";     // 나중에 .env로 빼기!

router.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body;
        const exists = await User.findOne({email});
        if (exists) {
            return res.status(400).json({message: "이미 가입된 이메일 입니다."});
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({email, password: hashed});

        res.json({message: "회원가입 성공!", user});
    } catch (err) {
        res.status(500).json({message: "서버 에러", err});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "사용자가 없습니다"});

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({message: "비밀번호가 틀렸습니다."});

        const token = jwt.sign({userId: user._id}, SECRET);

        res.json({message: "로그인 성공", token});
    } catch (err) {
        res.status(500).json({message: "서버 에러", err});
    }
});

module.exports = router;