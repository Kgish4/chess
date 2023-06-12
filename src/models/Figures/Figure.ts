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
  turn: number;

  constructor(color: Colors, cell: Cell) {
    this.cell = cell;
    this.color = color;
    this.cell.figure = this;
    this.turn = 0;
  }

  public canMove(targetCell: Cell): boolean {
    if (targetCell.figure?.color === this.color) {
      return false;
    }

    return true;
  }
  public canAttack(targetCell: Cell) {
    return this.canMove(targetCell);
  }
  public moveFigure(targetCell: Cell) {
    this.turn += 1;
  }
}
