const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = 3001;
const CardRoute = require('./routes/CardRoutes.js');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/cards', CardRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
