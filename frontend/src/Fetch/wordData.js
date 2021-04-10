// get all the words
const getAllWord = () => {
  return fetch("/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
      query {
        words {
          _id
          word
          origin
          pronunciations
          info {
            pos
            definitions {
              definition
              examples
            }
          }
        }
      }
      `,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(`HTTP ERROR ${response.statusText}`);
        throw error;
      }
    })
    .then((res) => res.json());
};

// store a word
const createWord = (newWord) => {
  return fetch("/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
      mutation {
        createWord(name: "${newWord}"){
          _id
          word
      }
      }
      `,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(`HTTP ERROR ${response.statusText}`);
        throw error;
      }
    })
    .then((res) => res.json());
};

module.exports = {
  getAllWord,
  createWord,
};
