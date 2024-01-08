const router = require('express').Router();
const User = require('../models/useModule');
const bcrypt = require('bcryptjs');

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

module.exports = router;
