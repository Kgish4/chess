import { Pawn } from "./Figures/Pawn";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FiguresName } from "./Figures/Figure";
import { Queen } from "./Figures/Queen";
import { Knight } from "./Figures/Knight";
import { Rook } from "./Figures/Rook";
import { Bishop } from "./Figures/Bishop";
import { States } from "../helpers/constants";
import { King } from "./Figures/King";

export class Cell {
  x: number;
  y: number;
  color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  enPassant: Cell | null;
  pawnUpgrade: Boolean;

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
    this.pawnUpgrade = false;
  }

  private mockFigure(targetCell: Cell) {
    const targetCellFigure = targetCell.figure;
    let oldKingPosition;
    let pawnEnPassant;
    if (this.figure instanceof King) {
      oldKingPosition = this.board.kingsPosition.get(this.figure.color);
      this.board.kingsPosition.set(this.figure.color, targetCell);
    }
    if (this.figure instanceof Pawn) {
      const enPassantPosition =
        this.figure.turnsWhenEnPassantCaptureAvailable?.get(
          this.board.turn + 1
        ) ||
        this.figure.turnsWhenEnPassantCaptureAvailable?.get(this.board.turn);
      const dy = Math.abs(this.y - targetCell.y);

      if (dy === 2) {
        this.figure.findCellsForEnPassantCapture(targetCell);
      }
      if (
        targetCell.x === enPassantPosition?.x &&
        targetCell.y === enPassantPosition.y
      ) {
        pawnEnPassant = this.board.getCell(targetCell.x, this.y).figure;
        this.board.getCell(targetCell.x, this.y).figure = null;
      }
    }
    targetCell.setFigure(this.figure);
    this.figure = null;

    return () => {
      if (targetCell.figure instanceof Pawn && pawnEnPassant) {
        this.board.getCell(targetCell.x, this.y).figure = pawnEnPassant;
      }
      if (oldKingPosition && targetCell.figure) {
        this.board.kingsPosition.set(targetCell.figure.color, oldKingPosition);
      }
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
  public isTeammate(targetCell: Cell) {
    if (targetCell.figure) {
      return targetCell.figure.color === this.figure?.color;
    }
    return false;
  }

  public validateCheck(targetCell: Cell): boolean {
    const returnFigure = this.mockFigure(targetCell);

    const boardState = this.board.goThroughTheCells((cell, resultMap) => {
      const isEnemyFigure = targetCell.isEnemy(cell);
      if (!isEnemyFigure) {
        return;
      }
      const enemyFigure = cell.figure!;
      this.fillBoardState(resultMap, enemyFigure, States.CHECK, this.isCheck);
    });
    returnFigure();
    return boardState.get(States.CHECK);
  }
  public validateBoardState(targetCell: Cell): Map<string, boolean> {
    const returnFigure = this.mockFigure(targetCell);

    const boardState = this.board.goThroughTheCells((cell, resultMap) => {
      const isEnemyFigure = targetCell.isEnemy(cell);
      if (isEnemyFigure) {
        const enemy = cell.figure!;
        this.fillBoardState(resultMap, enemy, States.HASMOVES, this.hasMoves);
        return;
      }
      const isTeammateFigure = targetCell.isTeammate(cell);
      if (isTeammateFigure) {
        const teammate = cell.figure!;
        this.fillBoardState(resultMap, teammate, States.CHECK, this.isCheck);
      }
    });
    returnFigure();
    return boardState;
  }

  private fillBoardState(
    resultMap: Map<string, boolean>,
    figure: Figure,
    state: States,
    method: (figure: Figure) => boolean
  ) {
    if (!resultMap.has(state)) {
      resultMap.set(state, false);
    }
    const check = method.call(this, figure);
    if (check) {
      resultMap.set(state, true);
    }
  }

  private hasMoves(figure: Figure): boolean {
    if (figure.hasMoves()) {
      return true;
    }
    return false;
  }

  public isCheck(figure: Figure): boolean {
    const enemyKingColor =
      figure.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
    const enemyKingPosition = this.board.kingsPosition.get(enemyKingColor);
    if (figure.canAttack(enemyKingPosition!)) {
      return true;
    }
    return false;
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

  public upgradePawn(upgradedPawn: Cell, figureName: FiguresName, color) {
    if (!this.pawnUpgrade) {
      return;
    }
    this.figure = null;
    switch (figureName) {
      case FiguresName.QUEEN:
        new Queen(color, upgradedPawn);
        break;
      case FiguresName.KNIGHT:
        new Knight(color, upgradedPawn);
        break;
      case FiguresName.ROOK:
        new Rook(color, upgradedPawn);
        break;
      case FiguresName.BISHOP:
        new Bishop(color, upgradedPawn);
        break;
    }
  }

  public moveFigure(targetCell: Cell) {
    const figure = this.figure;
    const isPawnLastMove =
      figure instanceof Pawn && figure.isLastMove(targetCell);
    if (isPawnLastMove) {
      this.pawnUpgrade = true;
      return;
    }
    if (figure) {
      figure.moveFigure(targetCell);
      targetCell.setFigure(figure);
      this.board.turn += 1;
      this.figure = null;
    }
  }
}
