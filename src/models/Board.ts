import { Cell } from "./Cell";
import { VERTICAL_LINE, HORIZONTAL_LINE } from "../helpers/presets/default";
import { Colors } from "./Colors";
import { Rook } from "./Figures/Rook";
import { Bishop } from "./Figures/Bishop";
import { Knight } from "./Figures/Knight";
import { Queen } from "./Figures/Queen";
import { King } from "./Figures/King";
import { Pawn } from "./Figures/Pawn";

export class Board {
  cells: Cell[] = [];

  initCells() {
    for (let i = 0; i < HORIZONTAL_LINE.length; i++) {
      for (let j = 0; j < VERTICAL_LINE.length; j++) {
        if ((i + j) % 2 === 0) {
          this.cells.push(new Cell(this, j, i, Colors.WHITE, null));
        } else {
          this.cells.push(new Cell(this, j, i, Colors.BLACK, null));
        }
      }
    }
  }
  public getCell(x, y): Cell {
    return this.cells.find((cell) => cell.x === x && cell.y === y)!;
  }
  private initPawns() {
    for (let i = 0; i < VERTICAL_LINE.length; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }

  private initKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private initQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private initKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private initBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private initRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  public addFigures() {
    this.initRooks();
    this.initBishops();
    this.initKnights();
    this.initQueens();
    this.initKings();
    this.initPawns();
  }
}
