import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FigureContainer } from "./figure.style";
import FiguresList from "../../helpers/figuresList";
import { FigureType } from "./types";
import { startMove, clearActiveCells } from "../../redux/actions";
import { Coordinates, RootState, Position, Cell } from "../../redux/types";

const movePawn = (x: Coordinates, y: Coordinates, position: Position) => {
  const result: Cell[] = [];
  const direction = position === "top" ? 1 : -1;
  const firstPosition = (y + direction) as Coordinates;
  if (firstPosition > 0 || firstPosition < 9) {
    result.push({ x: x, y: firstPosition });
  }

  const secondPosition = (y + direction * 2) as Coordinates;
  return [
    { x: x, y: firstPosition },
    { x: x, y: secondPosition },
  ];
};

const getMoves = (
  figureName: string,
  x: Coordinates,
  y: Coordinates,
  position: Position
): Cell[] => {
  if (figureName === "pawn") {
    return movePawn(x, y, position);
  }

  return [{ x: x, y: y }];
};

const Figure = ({ figureName, color = "white", x, y, onClick }: FigureType) => {
  const FigureJSX = FiguresList[figureName];

  const dispatch = useDispatch();
  const { whitePosition, blackPosition } = useSelector(
    (state: RootState) => state.figures
  );
  const { side } = useSelector((state: RootState) => state.game);

  const position = color === "white" ? whitePosition : blackPosition;

  const selectFigure = () => {
    if (side === color) {
      makeActive();
    }
  };

  const makeActive = () => {
    dispatch(clearActiveCells(null));
    dispatch(startMove(getMoves(figureName, x, y, position)));
  };
  return (
    <FigureContainer onClick={selectFigure} x={x} y={y}>
      <FigureJSX fill={color} />
    </FigureContainer>
  );
};

export default Figure;
