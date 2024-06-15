require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');

// db
const connectDB = require('./db/config');
// import route
const jobsRouter = require('./routes/jobRoutes');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// middlewares
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
