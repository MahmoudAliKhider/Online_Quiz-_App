const router = require('express').Router();

const authMiddleware = require('../middlewares/authMiddleware');
const Report = require('../models/reportModel');
const Exam = require('../models/examModule');
const User = require("../models/useModule");

router.post('/add-report', authMiddleware, async (req, res) => {
    try {
        const newAttempt = new Report(req.body);
        await newAttempt.save();

        res.send({
            message: 'Attempt Successfully added ',
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        })
    }
})

router.post('/get-all-reports', authMiddleware, async (req, res) => {
    try {
        const reports = await Report.find().populate("user").populate("exam").sort({ createAt: -1 });
        res.send({
            message: "Attempts fetched successfully",
            data: reports,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

router.post('/get-all-reports-by-user', authMiddleware, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.body.userId }).populate("User").populate("exam").sort({ createAt: -1 })
        res.send({
            message: "Attempts fetched successfully",
            data: reports,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
})

module.exports = router;
