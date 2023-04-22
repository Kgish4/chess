import React from "react";

import { FigureContainer } from "./figure.d";
import FiguresList from "../../helpers/figuresList";
import { FigureType } from "./types";

const Figure = ({ figureName, color = "white", x, y }: FigureType) => {
  const FigureJSX = FiguresList[figureName];
  return (
    <FigureContainer x={x} y={y}>
      <FigureJSX fill={color} />
    </FigureContainer>
  );
};

export default Figure;
