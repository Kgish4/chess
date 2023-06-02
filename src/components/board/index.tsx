import React, { useEffect, useState, useMemo } from "react";
import { Wrapper, Board as BoardContainer } from "./board.style";
import { Board } from "../../models/Board";
import CellComponent from "../cell";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";

interface BoardProps {
  board: Board;
  currentPlayer: Colors;
  swapPlayer: () => void;
}

const BoardComponent = ({
  board,
  currentPlayer,
  swapPlayer,
}: BoardProps): JSX.Element => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  useEffect(() => {}, [selectedCell]);
  const click = (cell: Cell) => {
    if (selectedCell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
      console.log("1");
    } else if (cell.figure?.color === currentPlayer) {
      setSelectedCell(cell);
      console.log("2");
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
