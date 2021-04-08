import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [words, setWords] = useState("");
  useEffect(() => {}, []);
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.currentTarget.querySelector("input").value);
          fetch(`/search/${e.currentTarget.querySelector("input").value}`)
            .then((res) => res.json())
            .then((data) => setWords(data.message));
        }}
      >
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </form>
      {words ? <p>{words}</p> : ""}
    </div>
  );
}

export default App;
