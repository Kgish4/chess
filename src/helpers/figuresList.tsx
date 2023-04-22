import { King, Bishop, Knight, Pawn, Rook, Queen } from "../assets/figures/";

export type Figures = {
  queen: Function;
  king: Function;
  bishop: Function;
  knight: Function;
  pawn: Function;
  rook: Function;
};

export type FiguresNames = keyof Figures;

const FiguresList: Figures = {
  queen: Queen,
  king: King,
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
  rook: Rook,
};

export default FiguresList;
