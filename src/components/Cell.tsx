import React from 'react';

interface CellProps {
  value: number;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  return (
    <div className={`cell cell-${value}`}>{value !== 0 ? value : ''}</div>
  );
};

export default Cell;