import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStore, Side, Cell } from "../types";

const changeSide: { white: Side; black: Side } = {
  white: "black",
  black: "white",
};

const initialState: GameStore = {
  currentTurn: 1,
  side: "white",
  isMoveStart: false,
  activeCells: [],
};
const gameSlice = createSlice({
  name: "Game",
  initialState: initialState,
  reducers: {
    finishMove: (state, action: PayloadAction<Side>) => {
      state.side = changeSide[action.payload];
      state.currentTurn += 1;
      state.isMoveStart = false;
    },
    startMove(state, action: PayloadAction<Cell[]>) {
      state.activeCells = action.payload;
      state.isMoveStart = true;
    },
    clearActiveCells(state, action) {
      state.activeCells = [];
    },
  },
});

export const { finishMove, startMove, clearActiveCells } = gameSlice.actions;

export default gameSlice.reducer;
