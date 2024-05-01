import React from 'react';
import './App.css';
import LandPage from './Components/LandPage';
import Entity from './Components/Entity';
import entityData from './Components/entityData.json';

function App() {
  return (
    <>
      <LandPage />
      <div className="entity-list">
        {entityData.map((entity, index) => (
          <Entity key={index} {...entity} />
        ))}
      </div>
    </>
  );
};

export default App;
