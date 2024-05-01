import React from 'react';

const Entity = ({ entity }) => {
  return (
    <div className="entity">
      <h2>{entity.name}</h2>
      <p>Team: {entity.team}</p>
      <p>Car Model: {entity.carModel}</p>
      <p>Engine: {entity.engine}</p>
      <p>Wins in 2023 Season: {entity.winsIn2023Season}</p>
      <p>Pole Positions in 2023 Season: {entity.polePositionsIn2023Season}</p>
    </div>
  );
};

export default Entity;
