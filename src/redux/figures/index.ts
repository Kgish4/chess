import { createSlice } from "@reduxjs/toolkit";
import { FiguresStore } from "../types";

const initialState: FiguresStore = {
  whitePosition: "top",
  blackPosition: "bottom",
};
const figuresSlice = createSlice({
  name: "Figures",
  initialState: initialState,
  reducers: {},
});

export default figuresSlice.reducer;
