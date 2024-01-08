const router = require('express').Router();

const authMiddleware = require("../middlewares/authMiddleware.js");
const Exam = require('../models/examModule.js');

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const examExists = await Exam.findOne({ name: req.body.name });
        if (examExists) {
            return res.status(200).send({
                message: "Exam already exists",
                success: false,
            })
        }
        req.body.questions = [];
        const newExam = new Exam(req.body);
        await newExam.save();

        res.status(200).send({
            message: "Exam Added successfully",
            success: true,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        })
    }
})

module.exports = router;