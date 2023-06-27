import { Cell } from "./Cell";
import { VERTICAL_LINE, HORIZONTAL_LINE } from "../helpers/constants";
import { Colors } from "./Colors";
import { Rook } from "./Figures/Rook";
import { Bishop } from "./Figures/Bishop";
import { Knight } from "./Figures/Knight";
import { Queen } from "./Figures/Queen";
import { King } from "./Figures/King";
import { Pawn } from "./Figures/Pawn";

export class Board {
  cells: Cell[] = [];
  turn: number;
  kingsPosition: Map<Colors, Cell>;
  constructor(turn?: number) {
    this.turn = turn || 0;
    this.kingsPosition = new Map();
  }

  private initPawns() {
    for (let i = 0; i < VERTICAL_LINE.length; i++) {
      new Pawn(Colors.WHITE, this.getCell(i + 1, 7));
      new Pawn(Colors.BLACK, this.getCell(i + 1, 2));
    }
  }

  private initKings() {
    const blackKingCell = this.getCell(5, 1);
    const whiteKingCell = this.getCell(5, 8);
    new King(Colors.BLACK, blackKingCell);
    new King(Colors.WHITE, whiteKingCell);
    this.kingsPosition.set(Colors.BLACK, blackKingCell);
    this.kingsPosition.set(Colors.WHITE, whiteKingCell);
  }

  private initQueens() {
    new Queen(Colors.BLACK, this.getCell(4, 1));
    new Queen(Colors.WHITE, this.getCell(4, 8));
  }

  private initKnights() {
    new Knight(Colors.BLACK, this.getCell(2, 1));
    new Knight(Colors.WHITE, this.getCell(2, 8));
    new Knight(Colors.BLACK, this.getCell(7, 1));
    new Knight(Colors.WHITE, this.getCell(7, 8));
  }

  private initBishops() {
    new Bishop(Colors.BLACK, this.getCell(3, 1));
    new Bishop(Colors.WHITE, this.getCell(3, 8));
    new Bishop(Colors.BLACK, this.getCell(6, 1));
    new Bishop(Colors.WHITE, this.getCell(6, 8));
  }

  private initRooks() {
    new Rook(Colors.BLACK, this.getCell(1, 1));
    new Rook(Colors.WHITE, this.getCell(1, 8));
    new Rook(Colors.BLACK, this.getCell(8, 1));
    new Rook(Colors.WHITE, this.getCell(8, 8));
  }

  public checkMove(cell, targetCell) {
    const isFigureCanMove = !!targetCell?.figure?.canMove(cell);
    if (!isFigureCanMove) {
      cell.available = false;
      return;
    }

    const result = targetCell.validateCheck(cell);
    cell.available = !result;
  }

  public addFigures() {
    this.initRooks();
    this.initBishops();
    this.initKnights();
    this.initQueens();
    this.initKings();
    this.initPawns();
  }

  public initCells() {
    for (let i = 0; i < HORIZONTAL_LINE.length; i++) {
      for (let j = 0; j < VERTICAL_LINE.length; j++) {
        if ((i + j) % 2 === 0) {
          this.cells.push(new Cell(this, j + 1, i + 1, Colors.WHITE, null));
        } else {
          this.cells.push(new Cell(this, j + 1, i + 1, Colors.BLACK, null));
        }
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board(this.turn);
    newBoard.cells = this.cells;
    newBoard.turn = this.turn;
    return newBoard;
  }
  public getCell(x, y): Cell {
    return this.cells.find((cell) => cell.x === x && cell.y === y)!;
  }

  public goThroughTheCells(
    callback: (cell: Cell, result: Map<string, boolean>) => void
  ) {
    let result = new Map();
    for (let i = 0; i < this.cells.length - 1; i++) {
      const cell = this.cells[i];
      callback(cell, result);
    }
    return result;
  }

  public highlightCells(targetCell: Cell | null) {
    if (this.cells.length === 0) {
      return;
    }

    this.goThroughTheCells((cell) => this.checkMove(cell, targetCell));
  }
}
