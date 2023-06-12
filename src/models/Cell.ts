import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FiguresName } from "./Figures/Figure";

export class Cell {
  x: number;
  y: number;
  color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  enPassant: Cell | null;

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

  private mockFigure(targetCell: Cell) {
    const targetCellFigure = targetCell.figure;
    targetCell.setFigure(this.figure);
    this.figure = null;

    return () => {
      this.setFigure(targetCell.figure);
      targetCell.figure = targetCellFigure;
    };
  }

  public isEnemy(targetCell: Cell) {
    if (targetCell.figure) {
      return targetCell.figure.color !== this.figure?.color;
    }
    return false;
  }

  public isKingSafe(targetCell: Cell) {
    let result = true;
    const boardCells = this.board.cells;
    const color = this.figure?.color;
    const figure = this.figure!;
    const kingPosition =
      figure.name === FiguresName.KING
        ? targetCell
        : this.board.kingsPosition.get(figure.color);
    const returnFigure = this.mockFigure(targetCell);
    for (let i = 0; i < this.board.cells.length - 1; i++) {
      const cell = boardCells[i];
      let enemyFigure = this.isEnemy(cell) ? cell.figure : null;
      if (!enemyFigure) {
        continue;
      }

      if (enemyFigure.canAttack(kingPosition!)) {
        result = false;
        break;
      }
    }
    returnFigure();
    return result;
  }

  public isEmptyHorizontal(targetCell: Cell) {
    if (targetCell.y !== this.y) {
      return false;
    }
    const min = Math.min(targetCell.x, this.x);
    const max = Math.max(targetCell.x, this.x);

    for (let x = min + 1; x < max; x++) {
      if (this.board.getCell(x, targetCell.y).figure) {
        return false;
      }
    }
    return true;
  }

  public isEmptyVertical(targetCell: Cell) {
    if (targetCell.x !== this.x) {
      return false;
    }
    const min = Math.min(targetCell.y, this.y);
    const max = Math.max(targetCell.y, this.y);

    for (let y = min + 1; y < max; y++) {
      if (this.board.getCell(targetCell.x, y).figure) {
        return false;
      }
    }
    return true;
  }

  public isEmptyDiagonal(targetCell: Cell) {
    const absX = Math.abs(targetCell.x - this.x);
    const absY = Math.abs(targetCell.y - this.y);
    if (absX !== absY) {
      return false;
    }

    const dx = this.x < targetCell.x ? 1 : -1;
    const dy = this.y < targetCell.y ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (this.board.getCell(this.x + dx * i, this.y + dy * i).figure) {
        return false;
      }
    }

    return true;
  }

  public setFigure(figure: Figure | null) {
    this.figure = figure;
    if (this.figure) {
      this.figure.cell = this;
    }
  }

  public moveFigure(targetCell: Cell) {
    const figure = this.figure;
    if (targetCell.enPassant) {
      targetCell.enPassant.figure = null;
    }
    if (figure) {
      figure.moveFigure(targetCell);
      targetCell.setFigure(figure);
      this.board.turn += 1;
      this.figure = null;
    }
  }
}
