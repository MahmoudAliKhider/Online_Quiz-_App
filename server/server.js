const express = require('express');
require('dotenv').config();
const cors = require('cors');

const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/usersRoute');
const examRouter = require('./routes/examsRoute');
const reportRouter = require('./routes/reportRoute');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/exams', examRouter);
app.use('/api/reports', reportRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})