const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    correctanswer: {
        type: String,
        required: true,
    },
    options: {
        type: Object,
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exams'
    }
}, { timestamps: true });

const question = mongoose.model('questions', questionSchema);
module.exports = question;