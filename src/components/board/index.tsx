import React, { useEffect, useState } from "react";
import { Wrapper, Board as BoardContainer } from "./board.style";
import { Board } from "../../models/Board";
import CellComponent from "../cell";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";

interface BoardProps {
  board: Board;
  currentPlayer: Colors;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
}

const BoardComponent = ({
  board,
  currentPlayer,
  setBoard,
  swapPlayer,
}: BoardProps): JSX.Element => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };
  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };
  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const click = (cell: Cell) => {
    if (
      selectedCell &&
      selectedCell.figure?.canMove(cell) &&
      selectedCell.isKingSafe(cell)
    ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
    } else if (cell.figure?.color === currentPlayer) {
      setSelectedCell(cell);
    }
  };
  return (
    <Wrapper>
      <BoardContainer>
        {board.cells.map((cell) => {
          return (
            <CellComponent
              key={`${cell.x}${cell.y}`}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell.y}
              cell={cell}
              click={click}
            ></CellComponent>
          );
        })}
      </BoardContainer>
    </Wrapper>
  );
};

export default BoardComponent;
