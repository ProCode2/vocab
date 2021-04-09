const { default: axios } = require("axios");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const Word = require("./models/word");

const PORT = process.env.PORT || 3001;

const app = express();

const dbUri = `mongodb+srv://procode1:${process.env.DB_PASSWORD}@cluster0.xvget.mongodb.net/vocab?retryWrites=true&w=majority`;

// connect to db
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

// serve the react app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/getall", (req, res) => {
  Word.find({})
    .then((records) => {
      console.log(records);
      res.json(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

app.get("/search/:searchText", (req, res) => {
  const { searchText } = req.params;
  Word.find({
    word: { $regex: `.*${searchText.toLocaleLowerCase()}.*` },
  })
    .then((records) => {
      console.log(records);
      res.json(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

app.get("/add/:word", (req, res) => {
  const { word } = req.params;
  axios({
    method: "GET",
    url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word.toLocaleLowerCase()}`,
    headers: {
      app_id: process.env.API_ID,
      app_key: process.env.API_KEY,
    },
  })
    .then((d) => {
      let wordName = d.data.results[0].word;
      let pronunciations = d.data.results[0].lexicalEntries[0].entries[0].pronunciations.map(
        (item) => item.phoneticSpelling
      );

      let wordInfo = d.data.results[0].lexicalEntries.map((entry) => {
        let pos = entry.lexicalCategory.text;
        let definitions = entry.entries[0].senses.map((item) => ({
          definition: item.definitions[0],
          examples: item.examples.map((t) => t.text),
        }));
        return {
          pos: pos,
          definitions: definitions,
        };
      });

      let origin =
        d.data.results[0].lexicalEntries[0].entries[0].etymologies[0];

      const wordRecord = new Word({
        word: wordName,
        pronunciations: pronunciations,
        origin: origin,
        info: wordInfo,
      });

      wordRecord.save().then((result) => {
        console.log(result);
        res.json(result);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// redirect unhandled routes to react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
