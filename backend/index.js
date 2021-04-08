const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// serve the react app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/search/:searchText", (req, res) => {
  const { searchText } = req.params;
  console.log(searchText);
  res.json({ message: "Hello from server!" });
});

// redirect unhandled routes to react app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
