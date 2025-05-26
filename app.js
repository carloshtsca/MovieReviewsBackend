const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { handleNotFound } = require('./utils/helper');

require('dotenv').config();
require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);

app.use(handleNotFound);

app.use(errorHandler);

app.listen(8000, () => {
    console.log('The port is listening on port 8000');
});