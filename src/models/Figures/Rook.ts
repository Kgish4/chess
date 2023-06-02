import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.ROOK;
  }
  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) {
      return false;
    }
    if (
      this.cell.isEmptyHorizontal(targetCell) &&
      targetCell.y === this.cell.y
    ) {
      return true;
    }
    if (this.cell.isEmptyVertical(targetCell) && targetCell.x === this.cell.x) {
      return true;
    }
    return false;
  }
}
