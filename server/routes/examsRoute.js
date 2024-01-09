const router = require('express').Router();

const authMiddleware = require("../middlewares/authMiddleware.js");
const Exam = require('../models/examModule.js');
const Question = require('../models/questionModule.js');

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

router.get("/get-all-exams", authMiddleware, async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.send({
            message: "Exams fetched successfully",
            data: exams,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

router.get("/get-exam-by-id/:examId", authMiddleware, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId).populate('questions');
        res.send({
            message: "Exam fetched successfully",
            data: exam,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

router.put('/edit-exam-by-id/:examId', authMiddleware, async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(req.params.examId,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send({
            message: "Exam edited successfully",
            success: true,
            data: exam
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

router.delete('/delete-exam-by-id/:examId', authMiddleware, async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.examId);
        res.status(200).send({
            message: "Exam Delete successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

router.post('/add-question-to-exam', authMiddleware, async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        const question = await newQuestion.save();

        const exam = await Exam.findById(req.body.exam);
        exam.questions.push(question._id);

        await exam.save();
        res.send({
            message: "Question added successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

router.put("/edit-question-in-exam/:questionId", authMiddleware, async (req, res) => {
    try {
        await Question.findByIdAndUpdate(req.params.questionId, req.body);
        res.send({
            message: "Question edited successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });

    }
});

router.post("/delete-question-in-exam", authMiddleware, async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.body.questionId);

        // delete question in exam
        const exam = await Exam.findById(req.body.examId);
        exam.questions = exam.questions.filter((question) => question._id != req.body.questionId);
        
        await exam.save();
        res.send({
            message: "Question deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});

module.exports = router;