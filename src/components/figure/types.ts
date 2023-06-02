import { FiguresNames } from "../../helpers/figuresList";
import { Coordinates } from "../../redux/types";

export interface FigureType {
  figureName: FiguresNames;
  x: Coordinates;
  y: Coordinates;
  color?: string;
  onClick: Function;
}
