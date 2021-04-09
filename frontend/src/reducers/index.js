import wordReducer from "./wordReducer.js";
import appReducer from "./appReducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  word: wordReducer,
  app: appReducer,
});

export default rootReducer;
