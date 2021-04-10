const initialState = {
  // stores the current search text being searched by the user
  searchText: "",
  // dictates whether the full screen should appear or not
  fullPage: false,
  // dictates whether the search box should appear or not
  searching: false,
  // for storing success/error messages
  flashMessage: "",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };
    case "SET_FULL_PAGE":
      return {
        ...state,
        fullPage: action.payload,
      };
    case "SET_SEARCHING":
      return {
        ...state,
        searching: action.payload,
      };
    case "SET_FLASH_MESSAGE":
      return {
        ...state,
        flashMessage: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
