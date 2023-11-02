import React from 'react';
import Cell from './Cell';

interface BoardProps {
  board: number[][];
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="board-container">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, colIndex) => (
            <Cell key={colIndex} value={cellValue} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
