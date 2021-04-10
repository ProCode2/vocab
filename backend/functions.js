const { default: axios } = require("axios");

const getWordInfo = (word) => {
  return axios({
    method: "GET",
    url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word
      .trim()
      .toLocaleLowerCase()}`,
    headers: {
      app_id: process.env.API_ID,
      app_key: process.env.API_KEY,
    },
  }).then((d) => {
    let wordName = d.data.results[0].word;
    let pronunciations = d.data.results[0].lexicalEntries[0].entries[0].pronunciations.map(
      (item) => item.phoneticSpelling
    );

    let wordInfo = d.data.results[0].lexicalEntries.map((entry) => {
      let pos = entry.lexicalCategory.text;
      let definitions = entry.entries[0].senses.map((item) => ({
        definition: item.definitions ? item.definitions[0] : null,
        examples: item.examples ? item.examples.map((t) => t.text) : null,
      }));

      let info = {};
      if (pos) info.pos = pos;
      if (definitions[0]) info.definitions = definitions;
      return info;
    });

    let origin = d.data.results[0].lexicalEntries[0].entries[0].etymologies
      ? d.data.results[0].lexicalEntries[0].entries[0].etymologies[0]
      : null;

    return {
      word: wordName,
      pronunciations: pronunciations,
      origin: origin,
      info: wordInfo,
    };
  });
};

module.exports = {
  getWordInfo,
};
