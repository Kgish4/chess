import React, { useEffect, useState } from "react";
import {
  BonusFigures,
  Board as BoardContainer,
  CellWrapper,
} from "./board.style";
import { Board } from "../../models/Board";
import CellComponent from "../cell";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import FiguresList from "../../helpers/figuresList";
import { bonusFigures, GameResult, States } from "../../helpers/constants";
import { FiguresName } from "../../models/Figures/Figure";

interface BoardProps {
  board: Board;
  currentPlayer: Colors;
  gameResult: GameResult | null;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  setGameResult: (color: GameResult | null) => void;
}

const BoardComponent = ({
  board,
  currentPlayer,
  setBoard,
  swapPlayer,
  gameResult,
  setGameResult,
}: BoardProps): JSX.Element => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [passedPawn, setPassedPawn] = useState<Cell | null>(null);

  useEffect(() => {
    const updateBoard = () => {
      const newBoard = board.getCopyBoard();
      setBoard(newBoard);
    };
    const highlightCells = () => {
      board.highlightCells(selectedCell);
      updateBoard();
    };
    highlightCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);
  useEffect(() => {
    if (gameResult === GameResult.CHECKMATE) {
      alert(`${currentPlayer} win!`);
    }
    if (gameResult === GameResult.STALEMATE) {
      alert(`STALEMATE!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameResult]);

  const selectCell = (cell: Cell) => {
    if (cell.figure?.color === currentPlayer) {
      setSelectedCell(cell);
    }
  };

  const moveFigure = (cell: Cell) => {
    if (!selectedCell) {
      return;
    }
    const ourKingIsInCheck = selectedCell.validateCheck(cell);
    const gameState = selectedCell.validateBoardState(cell);
    const enemyKingIsInCheck = gameState.get(States.CHECK);
    const enemyFiguresHasMoves = gameState.get(States.HASMOVES);
    if (selectedCell.figure?.canMove(cell) && !ourKingIsInCheck) {
      selectedCell.moveFigure(cell);
      if (selectedCell.pawnUpgrade) {
        setPassedPawn(cell);
        return;
      }
      setSelectedCell(null);
      if (enemyKingIsInCheck && !enemyFiguresHasMoves) {
        setGameResult(GameResult.CHECKMATE);
        return;
      }
      if (!enemyFiguresHasMoves) {
        setGameResult(GameResult.STALEMATE);
        return;
      }
      swapPlayer();
    } else {
      selectCell(cell);
    }
  };

  const clickCell = (cell: Cell) => {
    if (passedPawn || gameResult) {
      return;
    }
    if (!selectedCell) {
      selectCell(cell);
      return;
    }
    moveFigure(cell);
  };

  const upgradePawn = (pawn: Cell, figureName: FiguresName) => {
    selectedCell?.upgradePawn(pawn, figureName, currentPlayer);
    setPassedPawn(null);
    setSelectedCell(null);
    swapPlayer();
  };

  return (
    <BoardContainer>
      {board.cells.map((cell) => {
        return (
          <CellWrapper
            key={`${cell.x}${cell.y}`}
            onClick={() => clickCell(cell)}
          >
            <CellComponent
              selected={cell.x === selectedCell?.x && cell.y === selectedCell.y}
              available={cell.available}
              figureName={cell.figure?.name || null}
              figureColor={cell.figure?.color || null}
              color={cell.color}
            ></CellComponent>
          </CellWrapper>
        );
      })}
      <BonusFigures>
        {!!passedPawn
          ? bonusFigures.map((figureName) => {
              const Figure = FiguresList[figureName];
              return (
                <CellWrapper
                  key={figureName}
                  onClick={() => upgradePawn(passedPawn, figureName)}
                >
                  <Figure fill={currentPlayer} />
                </CellWrapper>
              );
            })
          : null}
      </BonusFigures>
    </BoardContainer>
  );
};

export default BoardComponent;
