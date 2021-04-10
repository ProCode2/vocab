const mongoose = require("mongoose");
const schema = mongoose.Schema;

// word definition and examples
let definitionSchema = new schema({
  definition: String,
  examples: [String],
});

// info about word like parts of speech(pos) and definition etc
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

// Word model
const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
