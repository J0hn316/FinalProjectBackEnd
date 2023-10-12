const express = require("express");
const router = express.Router();
const PokemonCard = require("../models/PokemonCards.js");

//seed route
router.get("/seed", async (req, res) => {
  try {
    const defaultPokemon = await PokemonCard.create([
      {
        name: "bulbasaur",
        img: "http://img.pokemondb.net/artwork/bulbasaur",
      },
      {
        name: "charmander",
        img: "http://img.pokemondb.net/artwork/charmander",
      },
      {
        name: "squirtle",
        img: "http://img.pokemondb.net/artwork/squirtle",
      },
    ]);
    res.status(200).json(defaultPokemon);
  } catch (err) {
    console.error(err);
  }
});

//Index
router.get("/", async (req, res) => {
  try {
    const cards = await PokemonCard.find({});
    res.status(200).json(cards);
    // res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//Create card
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }
    const newMon = {
      name: req.body.name,
      img: (req.body.img =
        "http://img.pokemondb.net/artwork/" + req.body.name.toLowerCase()),
    };

    const PokeCard = await PokemonCard.create(newMon);
    return res.status(201).send(PokeCard);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Show card
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cards = await PokemonCard.findById(id);
    return res.status(200).json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Please provide a valid Name");
    }

    const { id } = req.params;

    req.body.img =
      "http://img.pokemondb.net/artwork/" + req.body.name.toLowerCase();
    const result = await PokemonCard.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Card not found" });
    }
    return res.status(200).send({ message: "Card updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await PokemonCard.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    return res
      .status(200)
      .send({ message: "Deleted successfully", deletedCard });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
