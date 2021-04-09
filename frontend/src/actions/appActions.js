/*
SET_SEARCH_TEXT
SET_FULL_PAGE
SET_SEARCHING
SET_FLASH_MESSAGE
*/

const setSearchText = (text) => {
  return {
    type: "SET_SEARCH_TEXT",
    payload: text,
  };
};

const setFullPage = (condition) => {
  return {
    type: "SET_FULL_PAGE",
    payload: condition,
  };
};

const setSearching = (condition) => {
  return {
    type: "SET_SEARCHING",
    payload: condition,
  };
};

const setFlashMessage = (message) => {
  return {
    type: "SET_FLASH_MESSAGE",
    payload: message,
  };
};

module.exports = {
  setSearching,
  setSearchText,
  setFullPage,
  setFlashMessage,
};
