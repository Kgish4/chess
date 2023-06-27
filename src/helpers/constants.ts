import { FiguresName } from "../models/Figures/Figure";

export const bonusFigures = [
  FiguresName.QUEEN,
  FiguresName.KNIGHT,
  FiguresName.BISHOP,
  FiguresName.ROOK,
];

export const VERTICAL_LINE = [1, 2, 3, 4, 5, 6, 7, 8];
export const HORIZONTAL_LINE = ["a", "b", "c", "d", "e", "f", "g", "h"];

export enum States {
  CHECK = "check",
  CHECKMATE = "checkmate",
  HASMOVES = "hasMoves",
}

export enum Colors {
  WHITE = "white",
  BLACK = "black",
}

export enum GameResult {
  CHECKMATE = "Checkmate",
  STALEMATE = "Stalemate",
}
