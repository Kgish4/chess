import { ReactElement } from "react";
import { King, Bishop, Knight, Pawn, Rook, Queen } from "../assets/figures/";
import { Colors } from "../models/Colors";

export type FigureComponent = { fill: Colors };

export type Figures = {
  queen: ({ fill }: FigureComponent) => ReactElement;
  king: ({ fill }: FigureComponent) => ReactElement;
  bishop: ({ fill }: FigureComponent) => ReactElement;
  knight: ({ fill }: FigureComponent) => ReactElement;
  pawn: ({ fill }: FigureComponent) => ReactElement;
  rook: ({ fill }: FigureComponent) => ReactElement;
};

const FiguresList: Figures = {
  queen: Queen,
  king: King,
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
  rook: Rook,
};

export default FiguresList;
