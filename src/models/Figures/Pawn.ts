import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class Pawn extends Figure {
  direction: number;
  enPassantAvailable: Map<number, { x: number; y: number }> | null;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.PAWN;
    if (this.cell.y === 1) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
  }

  private isEnPassantAvailable(targetCell: Cell): void {
    const board = this.cell.board;
    const rightCell = board.getCell(targetCell.x - 1, targetCell.y);
    const leftCell = board.getCell(targetCell.x + 1, targetCell.y);

    if (
      this.cell.isEnemy(rightCell) &&
      rightCell.figure?.name === FiguresName.PAWN
    ) {
      const enPassantMap = new Map();
      enPassantMap.set(this.cell.board.turn + 1, {
        x: targetCell.x,
        y: targetCell.y - 1 * this.direction,
      });
      rightCell.figure.enPassantAvailable = enPassantMap;
    }
    if (
      this.cell.isEnemy(leftCell) &&
      leftCell.figure?.name === FiguresName.PAWN
    ) {
      const enPassantMap = new Map();

      enPassantMap.set(this.cell.board.turn + 1, {
        x: targetCell.x,
        y: targetCell.y - 1 * this.direction,
      });
      leftCell.figure.enPassantAvailable = enPassantMap;
    }
  }

  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) {
      return false;
    }

    if (this.turn === 0) {
      if (this.cell.y === 1) {
        this.direction = 1;
      } else {
        this.direction = -1;
      }
      if (
        targetCell.x === this.cell.x &&
        targetCell.y === this.cell.y + 2 * this.direction &&
        !targetCell.figure
      ) {
        return true;
      }
    }

    const enPassantMoves = this.enPassantAvailable;
    if (enPassantMoves) {
      if (
        targetCell.x === enPassantMoves.get(this.cell.board.turn)?.x &&
        targetCell.y === enPassantMoves.get(this.cell.board.turn)?.y
      ) {
        return true;
      }
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
      this.isEnPassantAvailable(targetCell);
    }
    const enPassantPosition = this.enPassantAvailable?.get(
      this.cell.board.turn
    );

    if (
      targetCell.x === enPassantPosition?.x &&
      targetCell.y === enPassantPosition.y
    ) {
      this.cell.board.getCell(targetCell.x, this.cell.y).figure = null;
    }
    if (this.enPassantAvailable) {
      this.enPassantAvailable = null;
    }
  }
}
