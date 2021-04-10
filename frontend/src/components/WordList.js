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
          {words.length > 0 ? (
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
                  <h1 className="font-bold text-xl">{word.word}</h1>
                  <div>
                    <span className="text-gray-600">
                      [{word.pronunciations[0]}]
                    </span>
                    <span className="text-gray-600">[{word.info[0].pos}]</span>
                  </div>
                  <p>
                    {word.info[0].definitions &&
                      word.info[0].definitions[0].definition}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="font-bold text-2xl text-gray-500 text-center mt-24">
              <i className="fas fa-file-word text-6xl mb-3"></i>
              <p>Add your first word!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordList;
