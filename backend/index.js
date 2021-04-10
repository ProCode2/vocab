const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const Word = require("./models/word");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const { graphqlSchema } = require("./graphql/graphqlSchema");
const { getWordInfo } = require("./functions");

const PORT = process.env.PORT || 3001;

const app = express();

const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ple5l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

      createWord: (args) => {
        return getWordInfo(args.name).then((wordObj) => {
          const newWord = new Word(wordObj);

          return newWord.save().then((record) => ({
            _id: record.id,
            word: record.word,
            info: record.info,
            pronunciations: record.pronunciations,
            origin: record.origin,
          }));
        });
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

app.get("/add/:word", (req, res) => {
  const { word } = req.params;

  getWordInfo(word).then((wordObj) => {
    const newWord = new Word(wordObj);

    newWord
      .save()
      .then((w) => res.json(w))
      .catch((_) => res.status(400).json("something went wrong"));
  });
});

// redirect unhandled routes to react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
