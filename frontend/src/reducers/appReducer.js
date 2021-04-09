const initialState = {
  searchText: "",
  fullPage: false,
  searching: false,
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
