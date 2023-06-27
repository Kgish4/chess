import React, { FC, memo } from "react";
import { Square } from "./cell.style";
import FiguresList from "../../helpers/figuresList";
import { Colors } from "../../models/Colors";
import { FiguresName } from "../../models/Figures/Figure";

interface CellProps {
  figureName: FiguresName | null;
  figureColor: Colors | null;
  color: Colors;
  selected: boolean;
  available: boolean;
}

const CellComponent: FC<CellProps> = ({
  figureName,
  figureColor,
  color,
  available,
  selected,
}) => {
  let Figure;
  if (figureName) {
    Figure = FiguresList[figureName];
  }

  return (
    <Square
      selected={selected}
      available={!!available}
      dark={color === Colors.BLACK ? true : false}
    >
      {Figure && <Figure fill={figureColor} />}
    </Square>
  );
};

export { CellComponent };

function arePropsEqual(oldProps, newProps) {
  const isSameFigure =
    oldProps.figureName === newProps.figureName &&
    oldProps.figureColor === newProps.figureColor;
  return (
    oldProps.selected === newProps.selected &&
    oldProps.available === newProps.available &&
    isSameFigure
  );
}

export default memo(CellComponent, arePropsEqual);
