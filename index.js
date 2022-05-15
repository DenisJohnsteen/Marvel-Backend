const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");

// Creation du serveur
const app = express();
app.use(formidableMiddleware());
app.use(cors());
app.use(morgan("dev"));

// Connection a la BBD
mongoose.connect("mongodb://localhost/marvel");

// import des routes
const userRoutes = require("./routes/users");
app.use(userRoutes);

// app.get("/", (req, res) => {
//   res.status(200).json("Welcome ! take the direction on the road /comics ");
// });
// COMICS
app.get("/comics", async (req, res) => {
  console.log(req.query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/comics/:characterId", async (req, res) => {
  console.log(req.params.characterId);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error);
  }
});

// CHARACTERS
app.get("/characters", async (req, res) => {
  console.log(req.query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/character/:characterId", async (req, res) => {
  console.log(req.params.characterId);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable !");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started ! ");
});
