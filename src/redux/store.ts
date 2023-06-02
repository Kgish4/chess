import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import boardReducer from "./board";
import figuresReducer from "./figures";
import gameReducer from "./game";

const reducers = combineReducers({
  // board: boardReducer,
  figures: figuresReducer,
  game: gameReducer,
});

const store = configureStore({
  reducer: reducers,
});
export default store;
