const Word = require("../models/word");
const { getWordInfo } = require("../functions");

module.exports = {
  words: () => {
    return Word.find()
      .then((records) => {
        return records.map((record) => ({
          _id: record.id,
          word: record.word,
          info: record.info,
          pronunciations: record.pronunciations,
          origin: record.origin,
        }));
      })
      .catch((err) => console.log(err));
  },

  createWord: (args) => {
    return getWordInfo(args.name).then((wordObj) => {
      const newWord = new Word(wordObj);

      return newWord.save().then((record) => ({
        _id: record.id,
        word: record.word,
        info: record.info,
        pronunciations: record.pronunciations,
        origin: record.origin,
      }));
    });
  },
};
