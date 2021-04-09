import React from "react";

function WordDisplay({ word }) {
  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">{word.word}</h1>
      <p className="text-md mb-2 text-gray-400 italic">
        {word.pronunciations.join(", ")}
      </p>
      <hr />
      <div className="text-gray-400 my-2">
        <p>
          <span>Origin: </span>
          {word.origin}
        </p>
      </div>
      {word.info.map((wordInfo) => (
        <>
          <hr />
          <div className="py-3">
            <p className="text-gray-500 italic">{wordInfo.pos}</p>
            {wordInfo.definitions.map((df) => (
              <div>
                <p className="font-bold mb-1 mt-2">{df.definition}</p>
                <ul className="ml-8">
                  {df.examples.map((eg) => (
                    <li className="list-disc">{eg}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}

export default WordDisplay;
