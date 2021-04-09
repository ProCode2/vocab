const { default: axios } = require("axios");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const Word = require("./models/word");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const { graphqlSchema } = require("./graphql/graphqlSchema");

const PORT = process.env.PORT || 3001;

const app = express();

const dbUri = `mongodb+srv://procode1:${process.env.DB_PASSWORD}@cluster0.xvget.mongodb.net/vocab?retryWrites=true&w=majority`;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: buildSchema(graphqlSchema),
    rootValue: {
      words: () => {
        return Word.find()
          .then((records) => {
            return records.map((record) => ({
              _id: record.id,
              word: record.word,
              info: record.info,
              pronunciations: record.pronunciations,
              origin: record.origin,
            }));
          })
          .catch((err) => console.log(err));
      },
    },
    graphiql: true,
  })
);

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

// app.get("/getall", (req, res) => {
//   Word.find({})
//     .then((records) => {
//       console.log(records);
//       res.json(records);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// app.get("/search/:searchText", (req, res) => {
//   const { searchText } = req.params;
//   Word.find({
//     word: { $regex: `.*${searchText.toLocaleLowerCase()}.*` },
//   })
//     .then((records) => {
//       console.log(records);
//       res.json(records);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

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
      console.log(d.data.results[0].lexicalEntries[0].entries[0]);
      let wordName = d.data.results[0].word;
      let pronunciations = d.data.results[0].lexicalEntries[0].entries[0].pronunciations.map(
        (item) => item.phoneticSpelling
      );

      let wordInfo = d.data.results[0].lexicalEntries.map((entry) => {
        let pos = entry.lexicalCategory.text;
        let definitions = entry.entries[0].senses.map((item) => ({
          definition: item.definitions ? item.definitions[0] : null,
          examples: item.examples ? item.examples.map((t) => t.text) : null,
        }));

        let info = {};
        if (pos) info.pos = pos;
        if (definitions[0]) info.definitions = definitions;
        return info;
      });

      let origin = d.data.results[0].lexicalEntries[0].entries[0].etymologies
        ? d.data.results[0].lexicalEntries[0].entries[0].etymologies[0]
        : null;

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
