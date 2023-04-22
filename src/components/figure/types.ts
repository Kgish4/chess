import { FiguresNames } from "../../helpers/figuresList";

export interface FigureType {
  figureName: FiguresNames;
  x: number;
  y: number;
  color?: string;
}
