import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWord } from "../actions/wordActions";
import { setFullPage } from "../actions/appActions";

const WordList = () => {
  const dispatch = useDispatch();
  const wordState = useSelector((state) => state.word);
  const appState = useSelector((state) => state.app);

  const words = wordState.words;
  const searchText = appState.searchText;

  const filterWords = (ws) => {
    if (searchText === "") {
      return ws;
    }
    return ws.filter((w) => w.word.includes(searchText));
  };

  return (
    <div>
      <div className="w-full mx-auto">
        <hr />
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 w-full" x-max="1">
            {filterWords(words).map((word) => (
              <li
                key={word._id}
                className="py-4 w-full hover:bg-pink-100 px-4 cursor-pointer"
                onClick={() => {
                  dispatch(setCurrentWord(word));
                  dispatch(setFullPage(true));
                }}
              >
                <h1 className="font-bold">{word.word}</h1>
                <div>
                  <span className="text-gray-600">
                    [{word.pronunciations[0]}]
                  </span>
                  <span className="text-gray-600">[{word.info[0].pos}]</span>
                </div>
                <p>{word.origin}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WordList;
