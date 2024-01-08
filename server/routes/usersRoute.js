const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/useModule');
const authmiddleware = require('../middlewares/authMiddleware');

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({
                message: "User already registered",
                success: false,
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).send({
            message: "User Create Successfully",
            success: true,
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                message: "User Not Found",
                success: false
            })
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(200).send({
                message: "invalid Password",
                success: false
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.status(200).send({
            message: "User logged in successfully",
            success: true,
            data: token
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

router.post('/get-user-info', authmiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        res.status(200).send({
            message: "User info fetched successfully",
            success: true,
            data: user,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

module.exports = router;
