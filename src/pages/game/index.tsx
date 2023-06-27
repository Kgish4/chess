import React, { useEffect, useState } from "react";
import BoardComponent from "../../components/board";
import { Wrapper, StartButton } from "./game.style";
import { Board } from "../../models/Board";
import { Colors } from "../../models/Colors";
import { GameResult } from "../../helpers/constants";

const Game = () => {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState<Colors>(Colors.WHITE);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const swapPlayer = () =>
    currentPlayer === Colors.WHITE
      ? setCurrentPlayer(Colors.BLACK)
      : setCurrentPlayer(Colors.WHITE);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setGameResult(null);
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
        gameResult={gameResult}
        setGameResult={setGameResult}
      />
      <StartButton onClick={startGame} variant="contained">
        Start new game
      </StartButton>
    </Wrapper>
  );
};

export default Game;
