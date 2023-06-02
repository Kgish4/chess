import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./Figures/Figure";

export class Cell {
  x: number;
  y: number;
  color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
  }

  isEmptyHorizontal(targetCell: Cell) {
    const min = Math.min(targetCell.x, this.x);
    const max = Math.max(targetCell.x, this.x);

    for (let x = min + 1; x < max; x++) {
      if (this.board.getCell(x, targetCell.y).figure) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(targetCell: Cell) {
    const absX = Math.abs(targetCell.x - this.x);
    const absY = Math.abs(targetCell.y - this.y);
    if (absX !== absY) {
      return false;
    }
  }

  isEmptyVertical(targetCell: Cell) {
    const min = Math.min(targetCell.y, this.y);
    const max = Math.max(targetCell.y, this.y);

    for (let y = min + 1; y < max; y++) {
      if (this.board.getCell(targetCell.x, y).figure) {
        return false;
      }
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(cell: Cell) {
    if (this.figure) {
      this.figure.moveFigure();
      cell.setFigure(this.figure);
      this.figure = null;
    }
  }
}
