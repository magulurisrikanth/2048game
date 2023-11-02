import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(Array(4).fill(Array(4).fill(0)));
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const initializeBoard = () => {
    const newBoard = [...board];
    for (let i = 0; i < 2; i++) {
      // Generate random positions for the new cell
      let row, col;
      do {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
      } while (newBoard[row][col] !== 0);

      // Generate a random value (2 or 4)
      const newValue = Math.random() < 0.9 ? 2 : 4;
      newBoard[row][col] = newValue;
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const newBoard = [...board];
  
      // Define a function to merge tiles in a row/column.
      const mergeTiles = (row: number[]) => {
        const mergedRow: number[] = [];
        let i = 0;
        while (i < row.length) {
          if (row[i] === 0) {
            i++; // Skip empty cells.
          } else {
            const currentValue = row[i];
            if (i < row.length - 1 && row[i] === row[i + 1]) {
              // Merge adjacent tiles with the same value.
              const mergedValue = row[i] * 2;
              mergedRow.push(mergedValue);
              i += 2; // Skip the merged tiles.
            } else {
              mergedRow.push(currentValue);
              i++;
            }
          }
        }
  
        // Fill the remaining cells with zeros.
        while (mergedRow.length < row.length) {
          mergedRow.push(0);
        }
  
        return mergedRow;
      };
  
      // Implement game logic for different arrow key presses.
      switch (event.key) {
        case 'ArrowUp':
          // Move tiles up.
          for (let col = 0; col < 4; col++) {
            const colData = newBoard.map((row) => row[col]);
            const mergedCol = mergeTiles(colData);
            for (let row = 0; row < 4; row++) {
              newBoard[row][col] = mergedCol[row];
            }
          }
          break;
          case 'ArrowDown':
            // Move tiles down.
            for (let col = 0; col < 4; col++) {
              const colData = newBoard.map((row) => row[col]);
              const reversedCol = colData.reverse(); // Reverse the column to simplify merging.
              const mergedCol = mergeTiles(reversedCol);
              const reversedMergedCol = mergedCol.reverse(); // Reverse back to the original order.
              for (let row = 0; row < 4; row++) {
                newBoard[row][col] = reversedMergedCol[row];
              }
            }
            break;
            case 'ArrowLeft':
              // Move tiles down.
              for (let col = 0; col < 4; col++) {
                const colData = newBoard.map((row) => row[col]);
                const reversedCol = colData.reverse(); // Reverse the column to simplify merging.
                const mergedCol = mergeTiles(reversedCol);
                const reversedMergedCol = mergedCol.reverse(); // Reverse back to the original order.
                for (let row = 0; row < 4; row++) {
                  newBoard[row][col] = reversedMergedCol[row];
                }
              }
              break;
              case 'ArrowRight':
                // Move tiles down.
                for (let col = 0; col < 4; col++) {
                  const colData = newBoard.map((row) => row[col]);
                  const reversedCol = colData.reverse(); // Reverse the column to simplify merging.
                  const mergedCol = mergeTiles(reversedCol);
                  const reversedMergedCol = mergedCol.reverse(); // Reverse back to the original order.
                  for (let row = 0; row < 4; row++) {
                    newBoard[row][col] = reversedMergedCol[row];
                  }
                }
                break;
          
      }
  
      // Add a new random cell with value 2 or 4 (you can reuse your initializeBoard logic).
      // Update the state with the new board after the move.
      setBoard(newBoard);
    },
    [board]
  );
  

  const handleRestart = () => {
    // Reset the board, score, and game over state.
    setBoard(Array(4).fill(Array(4).fill(0)));
    setScore(0);
    setGameOver(false);
    initializeBoard();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="game-container">
      <h1>2048 Game</h1>
      <Board board={board} />

      <div className="game-info">
        <div className="score">Score: {score}</div>
        {gameOver && <div className="game-over">Game Over!</div>}
      </div>

      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default Game;