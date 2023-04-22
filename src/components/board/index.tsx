import React from "react";
import { Wrapper, Board as BoardContainer } from "./board.d";
import Cell from "../cell";

const generateBoard = (
  array?: JSX.Element[],
  horizontal?: number,
  vertical?: number
) => {
  const cells: JSX.Element[] = array || [];
  let x = horizontal ? horizontal + 1 : 1;
  let y = vertical || 1;
  if (x === 9) {
    x = 1;
    y += 1;
  }
  if (y > 8) {
    return cells;
  }
  if ((x + y) % 2 === 0) {
    cells.push(<Cell key={`${x}${y}`} dark />);
    generateBoard(cells, x, y);
  }
  if ((x + y) % 2 !== 0) {
    cells.push(<Cell key={`${x}${y}`} />);
    generateBoard(cells, x, y);
  }

  return cells;
};

const Board = ({ figures }: { figures: JSX.Element[] }): JSX.Element => {
  const board = generateBoard();
  console.log(figures);
  return (
    <Wrapper>
      {figures}
      <BoardContainer>{board}</BoardContainer>
    </Wrapper>
  );
};

export default Board;
