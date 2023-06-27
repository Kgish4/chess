import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class Pawn extends Figure {
  direction: number;
  turnsWhenEnPassantCaptureAvailable: Map<number, { x: number; y: number }>;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.PAWN;
    this.turnsWhenEnPassantCaptureAvailable = new Map();
    if (this.cell.y === 2) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
  }
  public findCellsForEnPassantCapture(targetCell: Cell): void {
    const board = this.cell.board;
    const rightCell = board.getCell(targetCell.x - 1, targetCell.y);
    const leftCell = board.getCell(targetCell.x + 1, targetCell.y);
    const updateAvailableCupture = (cell: Cell) => {
      if (this.cell.isEnemy(cell) && cell.figure instanceof Pawn) {
        const enPassantMap = new Map();
        enPassantMap.set(this.cell.board.turn + 1, {
          x: targetCell.x,
          y: targetCell.y - 1 * this.direction,
        });
        cell.figure.turnsWhenEnPassantCaptureAvailable = enPassantMap;
      }
    };
    if (rightCell) {
      updateAvailableCupture(rightCell);
    }
    if (leftCell) {
      updateAvailableCupture(leftCell);
    }
  }

  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) {
      return false;
    }

    if (this.turn === 0) {
      const nextCell = this.cell.board.getCell(
        this.cell.x,
        this.cell.y + 1 * this.direction
      );
      if (
        targetCell.x === this.cell.x &&
        targetCell.y === this.cell.y + 2 * this.direction &&
        !targetCell.figure &&
        !nextCell.figure
      ) {
        return true;
      }
    }
    const enPassantTurns = this.turnsWhenEnPassantCaptureAvailable;
    if (
      (targetCell.x === enPassantTurns.get(this.cell.board.turn)?.x &&
        targetCell.y === enPassantTurns.get(this.cell.board.turn)?.y) ||
      (targetCell.x === enPassantTurns.get(this.cell.board.turn + 1)?.x &&
        targetCell.y === enPassantTurns.get(this.cell.board.turn + 1)?.y)
    ) {
      return true;
    }

    if (targetCell.y === this.cell.y + 1 * this.direction) {
      if (targetCell.x === this.cell.x && !targetCell.figure) {
        return true;
      }
      if (
        (targetCell.x === this.cell.x + 1 ||
          targetCell.x === this.cell.x - 1) &&
        targetCell.figure
      ) {
        return true;
      }
    }

    return false;
  }

  public canAttack(targetCell: Cell) {
    if (
      targetCell.y === this.cell.y + 1 * this.direction &&
      (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x - 1)
    ) {
      return true;
    }
    return false;
  }

  public moveFigure(targetCell: Cell) {
    super.moveFigure(targetCell);
    const dy = Math.abs(this.cell.y - targetCell.y);
    if (dy === 2) {
      this.findCellsForEnPassantCapture(targetCell);
    }
    const enPassantCapturePosition =
      this.turnsWhenEnPassantCaptureAvailable?.get(this.cell.board.turn);

    if (
      targetCell.x === enPassantCapturePosition?.x &&
      targetCell.y === enPassantCapturePosition.y
    ) {
      this.cell.board.getCell(targetCell.x, this.cell.y).figure = null;
    }
    if (this.turnsWhenEnPassantCaptureAvailable) {
      this.turnsWhenEnPassantCaptureAvailable = new Map();
    }
  }

  public isLastMove(targetCell: Cell) {
    if (targetCell.y === 1 || targetCell.y === 8) {
      return true;
    }
    return false;
  }
}
