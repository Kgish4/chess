import React, { useMemo, useState } from "react";
import Board from "../../components/board";
import { Wrapper, StartButton } from "./game.d";
import { basePreset } from "../../helpers/presets/default";
import Figure from "../../components/figure";

const Game = () => {
  const [figures, setFigures] = useState<JSX.Element[]>([]);

  const initFigures = (): JSX.Element[] => {
    return basePreset.map(({ name, color, x, y }, index) => (
      <Figure key={index} figureName={name} color={color} x={x} y={y} />
    ));
  };

  const memoInitFigures = useMemo(initFigures, []);

  const startGame = () => {
    setFigures(memoInitFigures);
  };

  return (
    <Wrapper>
      <Board figures={figures} />
      <StartButton onClick={startGame} variant="contained">
        Start new game
      </StartButton>
    </Wrapper>
  );
};

export default Game;
