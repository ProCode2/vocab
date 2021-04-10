const initialState = {
  // for storing all the words
  words: [],
  // for storing the current word that will be shown in the full screen
  currentWord: {},
};

const wordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WORDS":
      return {
        ...state,
        words: action.payload,
      };
    case "SET_CURRENT_WORD":
      return {
        ...state,
        currentWord: action.payload,
      };
    default:
      return state;
  }
};

export default wordReducer;
