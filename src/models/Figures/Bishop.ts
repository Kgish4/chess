import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.BISHOP;
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell)) {
      return false;
    }
    if (this.cell.isEmptyDiagonal(cell)) {
      return true;
    }
    return false;
  }
}
