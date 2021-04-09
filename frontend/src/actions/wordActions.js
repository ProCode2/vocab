/*
SET_WORDS
SET_CURRENT_WORD
*/

const setWords = (words) => {
  return {
    type: "SET_WORDS",
    payload: words,
  };
};

const setCurrentWord = (word) => {
  return {
    type: "SET_CURRENT_WORD",
    payload: word,
  };
};

module.exports = {
  setCurrentWord,
  setWords,
};
