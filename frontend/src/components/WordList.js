import React from "react";

const WordList = ({ words, setFullPage, setCurrentWord }) => {
  return (
    <div>
      <div className="w-full mx-auto">
        <hr />
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 w-full" x-max="1">
            {words.map((word) => (
              <li
                key={word._id}
                className="py-4 w-full hover:bg-pink-100 px-4 cursor-pointer"
                onClick={() => {
                  setCurrentWord(word);
                  setFullPage(true);
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
