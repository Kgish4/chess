import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FiguresName {
  BISHOP = "bishop",
  KING = "king",
  KNIGHT = "knight",
  PAWN = "pawn",
  QUEEN = "queen",
  ROOK = "rook",
}

export class Figure {
  color: Colors;
  cell: Cell;
  name: FiguresName | null;
  constructor(color: Colors, cell: Cell) {
    this.cell = cell;
    this.color = color;
    this.cell.figure = this;
  }

  public canMove(cell: Cell): boolean {
    if (cell.figure?.color === this.color) {
      return false;
    }
    return true;
  }
  public moveFigure() {}
}
