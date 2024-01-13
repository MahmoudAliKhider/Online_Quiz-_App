const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/usersRoute');
const examRouter = require('./routes/examsRoute');
const reportRouter = require('./routes/reportRoute');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname + './client/build')))

app.use('/api/users', userRouter);
app.use('/api/exams', examRouter);
app.use('/api/reports', reportRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})