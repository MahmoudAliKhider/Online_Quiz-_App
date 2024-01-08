const express = require('express');
require('dotenv').config();
const cors = require('cors');

const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/usersRoute');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users',userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})