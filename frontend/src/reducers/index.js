import wordReducer from "./wordReducer.js";
import appReducer from "./appReducer.js";
import { combineReducers } from "redux";

// make a root reducer
const rootReducer = combineReducers({
  word: wordReducer,
  app: appReducer,
});

export default rootReducer;
