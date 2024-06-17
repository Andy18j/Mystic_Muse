const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists. Please use another email to signup" });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, email, password: hashedPassword,confirm_password:hashedPassword });
        await newUser.save()
        res.status(201).json({ msg: "User signed up successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});



userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({msg: "Login successful" ,token});
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});



module.exports ={
userRouter
} 