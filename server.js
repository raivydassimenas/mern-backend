const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;
const router = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', router);

app.listen(port, () => console.log(`Server started on port ${port}`));