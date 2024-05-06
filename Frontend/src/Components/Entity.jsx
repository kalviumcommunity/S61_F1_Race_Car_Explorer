import React, { useEffect, useState } from 'react';
import axios from "axios";

const Entity = () => {
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    // Fetch entities data from the server
    axios.get('http://localhost:3000/api/racecars')
      .then(response => {
        console.log(response.data);
        setEntities(response.data.raceCars);
      })
      .catch(error => {
        console.error('Error fetching entities:', error);
        setEntities([]); // Set entities to an empty array if there's an error
      });
  }, []);

  return (
    <div>
      {entities && entities.length > 0 ? (
        entities.map(entity => (
          <div className="entity" key={entity.id}>
            <h2>{entity.name}</h2>
            <p>Team: {entity.team}</p>
            <p>Car Model: {entity.carModel}</p>
            <p>Engine: {entity.engine}</p>
            <p>Wins in 2023 Season: {entity.winsIn2023Season}</p>
            <p>Pole Positions in 2023 Season: {entity.polePositionsIn2023Season}</p>
          </div>
        ))
      ) : (
        <p>No race cars available</p>
      )}
    </div>
  );
};

export default Entity;