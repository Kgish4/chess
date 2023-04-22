import { FiguresNames } from "../figuresList";

type FigureInPreset = {
  name: FiguresNames;
  color: string;
  x: number;
  y: number;
};

export const basePreset: FigureInPreset[] = [
  { name: "king", color: "white", x: 4, y: 1 },
  { name: "queen", color: "white", x: 5, y: 1 },
  { name: "bishop", color: "white", x: 6, y: 1 },
  { name: "bishop", color: "white", x: 3, y: 1 },
  { name: "knight", color: "white", x: 7, y: 1 },
  { name: "knight", color: "white", x: 2, y: 1 },
  { name: "rook", color: "white", x: 8, y: 1 },
  { name: "rook", color: "white", x: 1, y: 1 },
  { name: "pawn", color: "white", x: 1, y: 2 },
  { name: "pawn", color: "white", x: 2, y: 2 },
  { name: "pawn", color: "white", x: 3, y: 2 },
  { name: "pawn", color: "white", x: 4, y: 2 },
  { name: "pawn", color: "white", x: 5, y: 2 },
  { name: "pawn", color: "white", x: 6, y: 2 },
  { name: "pawn", color: "white", x: 7, y: 2 },
  { name: "pawn", color: "white", x: 8, y: 2 },
  { name: "king", color: "black", x: 4, y: 8 },
  { name: "queen", color: "black", x: 5, y: 8 },
  { name: "bishop", color: "black", x: 6, y: 8 },
  { name: "bishop", color: "black", x: 3, y: 8 },
  { name: "knight", color: "black", x: 7, y: 8 },
  { name: "knight", color: "black", x: 2, y: 8 },
  { name: "rook", color: "black", x: 8, y: 8 },
  { name: "rook", color: "black", x: 1, y: 8 },
  { name: "pawn", color: "black", x: 1, y: 7 },
  { name: "pawn", color: "black", x: 2, y: 7 },
  { name: "pawn", color: "black", x: 3, y: 7 },
  { name: "pawn", color: "black", x: 4, y: 7 },
  { name: "pawn", color: "black", x: 5, y: 7 },
  { name: "pawn", color: "black", x: 6, y: 7 },
  { name: "pawn", color: "black", x: 7, y: 7 },
  { name: "pawn", color: "black", x: 8, y: 7 },
];
