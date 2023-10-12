const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = 3001;
const CardRoute = require("./routes/CardRoutes.js");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/cards", CardRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}/cards/seed`);
    });
  })
  .catch((err) => {
    console.error(`${err} connecting to database`);
  });
