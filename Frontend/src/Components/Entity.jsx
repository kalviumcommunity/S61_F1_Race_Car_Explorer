import React from 'react';

const Entity = (props) => {
  const { id, name, team, carModel, engine, winsIn2023Season, polePositionsIn2023Season } = props;

  return (
    <div className="entity">
      <h2>{name}</h2>
      <p>Team: {team}</p>
      <p>Car Model: {carModel}</p>
      <p>Engine: {engine}</p>
      <p>Wins in 2023 Season: {winsIn2023Season}</p>
      <p>Pole Positions in 2023 Season: {polePositionsIn2023Season}</p>
    </div>
  );
};

export default Entity;
