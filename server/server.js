const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})