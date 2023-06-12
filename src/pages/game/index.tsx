import React, { useEffect, useState } from "react";
import BoardComponent from "../../components/board";
import { Wrapper, StartButton } from "./game.style";
import { Board } from "../../models/Board";
import { Colors } from "../../models/Colors";

const Game = () => {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState<Colors>(Colors.WHITE);

  const swapPlayer = () =>
    currentPlayer === Colors.WHITE
      ? setCurrentPlayer(Colors.BLACK)
      : setCurrentPlayer(Colors.WHITE);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setCurrentPlayer(Colors.WHITE);
    setBoard(newBoard);
  };

  return (
    <Wrapper>
      <BoardComponent
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        board={board}
        setBoard={setBoard}
      />
      <StartButton onClick={startGame} variant="contained">
        Start new game
      </StartButton>
    </Wrapper>
  );
};

export default Game;
