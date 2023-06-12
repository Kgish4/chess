import React from "react";
import { Square } from "./cell.style";
import FiguresList from "../../helpers/figuresList";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent = ({ cell, selected, click }: CellProps) => {
  let Figure;
  if (cell.figure?.name) {
    Figure = FiguresList[cell.figure?.name];
  }

  return (
    <Square
      onClick={() => click(cell)}
      selected={selected}
      available={cell.available ? true : false}
      dark={cell.color === Colors.BLACK ? true : false}
    >
      {Figure && (
        <Figure fill={cell.figure?.color === Colors.BLACK ? "dark" : "white"} />
      )}
    </Square>
  );
};

export default CellComponent;
