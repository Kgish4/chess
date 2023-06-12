import { HORIZONTAL_LINE } from "../../helpers/presets/default";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.KING;
  }

  private canCastle(targetCell: Cell) {
    const dx = Math.abs(this.cell.x - targetCell.x);
    const dy = Math.abs(this.cell.y - targetCell.y);

    if (this.turn !== 0 || dx !== 2 || dy !== 0) {
      return false;
    }
    if (!this.cell.isKingSafe(this.cell)) {
      return false;
    }

    const kingPosition = this.cell;

    const leftCastle = targetCell.x === 2;
    const rightCastle = targetCell.x === 6;

    const checkCastle = (oldRookX, newRookX) => {
      const rookCell = kingPosition.board.getCell(oldRookX, kingPosition.y);
      const castleAvailable =
        rookCell.figure?.turn === 0 &&
        kingPosition.isEmptyHorizontal(
          kingPosition.board.getCell(oldRookX, kingPosition.y)
        );
      if (castleAvailable) {
        const newRookPosition = kingPosition.board.getCell(
          newRookX,
          kingPosition.y
        );
        if (kingPosition.isKingSafe(newRookPosition)) {
          return true;
        }
      }
      return false;
    };

    if (leftCastle) {
      return checkCastle(0, targetCell.x + 1);
    }
    if (rightCastle) {
      return checkCastle(HORIZONTAL_LINE.length - 1, targetCell.x - 1);
    }

    return false;
  }

  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) {
      return false;
    }

    return this.canCastle(targetCell) || this.canAttack(targetCell);
  }

  public canAttack(targetCell: Cell): boolean {
    const dx = Math.abs(this.cell.x - targetCell.x);
    const dy = Math.abs(this.cell.y - targetCell.y);
    if (dx < 2 && dy < 2 && dx + dy > 0) {
      return true;
    }
    return false;
  }

  public moveFigure(targetCell: Cell): void {
    this.cell.board.kingsPosition.set(this.color, targetCell);
    if (this.canCastle(targetCell)) {
      const newX = targetCell.x > this.cell.x ? 5 : 3;
      const oldX = targetCell.x > this.cell.x ? 7 : 0;
      const newCellWithRook = this.cell.board.getCell(newX, this.cell.y);
      const oldCellWithRook = this.cell.board.getCell(oldX, this.cell.y);
      oldCellWithRook.moveFigure(newCellWithRook);
    }
    super.moveFigure(targetCell);
  }
}
