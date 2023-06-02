import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.KNIGHT;
  }

  public canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) {
      return false;
    }
    const dx = Math.abs(targetCell.x - this.cell.x);
    const dy = Math.abs(targetCell.y - this.cell.y);
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  }
}
