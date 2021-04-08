const mongoose = require("mongoose");
const schema = mongoose.Schema;

let definitionSchema = new schema({
  definition: String,
  examples: [String],
});

let infoSchema = new schema({
  pos: String,
  definitions: [definitionSchema],
});

let wordSchema = new schema(
  {
    word: String,
    pronunciations: [String],
    origin: String,
    info: [infoSchema],
  },
  { timestamps: true }
);

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
