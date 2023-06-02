import store from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface BoardStore {
  activeCells: Cell[];
}

export interface GameStore {
  currentTurn: number;
  side: Side;
  isMoveStart: boolean;
  activeCells: Cell[];
}

export interface FiguresStore {
  whitePosition: Position;
  blackPosition: Position;
}

export type Cell = {
  x: Coordinates;
  y: Coordinates;
};

export type Side = "white" | "black";

export type Position = "top" | "bottom";
export type Coordinates = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
