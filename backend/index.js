const { default: axios } = require("axios");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

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

app.get("/search/:searchText", (req, res) => {
  const { searchText } = req.params;
  axios({
    method: "GET",
    url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${searchText.toLocaleLowerCase()}`,
    headers: {
      app_id: process.env.API_ID,
      app_key: process.env.API_KEY,
    },
  }).then((d) => res.send(d.data));
  // res.json({ message: "Hello" });
});

// redirect unhandled routes to react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
