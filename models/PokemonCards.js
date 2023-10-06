const mongoose = require("mongoose");

const PokemonCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const PokemonCard = mongoose.model("PokemonCard", PokemonCardSchema);

module.exports = PokemonCard;
