import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import WordList from "./components/WordList";
import Modal from "./components/Modal";
import WordDisplay from "./components/WordDisplay";

function App() {
  const [searching, setSearching] = useState(false);
  const [words, setWords] = useState([]);
  const [fullPage, setFullPage] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentWord, setCurrentWord] = useState({});

  useEffect(() => {
    fetch("/getall")
      .then((res) => res.json())
      .then((d) => setWords(d))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const filterWords = (ws) => {
    if (searchText === "") {
      return ws;
    }
    return ws.filter((w) => w.word.includes(searchText));
  };

  return (
    <div className="App font-kumbh relative">
      <div className="bg-crane w-screen h-screen">
        <form action="#">
          <div className="p-4 text-white">
            {!searching ? (
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Vocab</h1>
                <i
                  className="fa fa-search text-xl cursor-pointer"
                  aria-hidden="true"
                  onClick={() => setSearching(true)}
                ></i>
              </div>
            ) : (
              <div className="flex justify-between items-center text-xl">
                <input
                  className="bg-transparent focus:outline-none"
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                  autoFocus
                />
                <i
                  className="fa fa-times text-xl cursor-pointer"
                  aria-hidden="true"
                  onClick={() => {
                    setSearchText("");
                    setSearching(false);
                  }}
                ></i>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className={fullPage ? "s t" : "s"}>
        <div className="flex justify-between items-center mx-4">
          {!fullPage ? (
            <h1 className="text-xl my-4 font-bold">Word List</h1>
          ) : null}
          {fullPage ? (
            <i
              className="fa fa-times text-xl cursor-pointer ml-auto p-4"
              aria-hidden="true"
              onClick={() => setFullPage(false)}
            ></i>
          ) : null}
        </div>
        {!fullPage ? (
          <WordList
            words={filterWords(words)}
            setFullPage={setFullPage}
            setCurrentWord={setCurrentWord}
          />
        ) : (
          <WordDisplay word={currentWord} />
        )}
      </div>
      <Modal />
    </div>
  );
}

export default App;
