const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const { graphqlSchema } = require("./graphql/graphqlSchema");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 3001;

const app = express();

// uri for connecting to mongodb
const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ple5l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// add graphql middleware
app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: buildSchema(graphqlSchema),
    rootValue: resolvers,
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

// redirect unhandled routes to react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
