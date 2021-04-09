import React from "react";
import { useSelector } from "react-redux";

function WordDisplay() {
  const wordState = useSelector((state) => state.word);

  const word = wordState.currentWord;

  const renderWordInfo = (word) => {
    return word.info.map((wordInfo) => (
      //  render parts of speech
      <div key={wordInfo.pos}>
        <hr />
        <div className="py-3">
          <p className="text-gray-500 italic">{wordInfo.pos}</p>
          {/* render different definitions and examples */}
          {wordInfo.definitions.map((df) => (
            <div key={df.definition}>
              <p className="font-bold mb-1 mt-2">{df.definition}</p>
              <ul className="ml-8">
                {/* list of examples supporting the definition */}
                {df.examples &&
                  df.examples.map((eg) => (
                    <li key={eg} className="list-disc">
                      {eg}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <hr />
      </div>
    ));
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">{word.word}</h1>
      <p className="text-md mb-2 text-gray-400 italic">
        {word.pronunciations.map((w) => `[ ${w} ]`).join(",  ")}
      </p>
      <hr />
      {word.origin && (
        <div className="text-gray-400 my-2">
          <p>
            <span>Origin: </span>
            {word.origin}
          </p>
        </div>
      )}
      {renderWordInfo(word)}
    </div>
  );
}

export default WordDisplay;
