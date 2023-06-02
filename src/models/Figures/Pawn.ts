import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FiguresName } from "./Figure";

export class Pawn extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FiguresName.PAWN;
  }
}
