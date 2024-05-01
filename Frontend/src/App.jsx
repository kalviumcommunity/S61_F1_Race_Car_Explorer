import './App.css';
import LandPage from './Components/LandPage';
import Entity from './Components/Entity';

const App = () => {
  const entities = [
    {
      name: "Lewis Hamilton",
      team: "Mercedes-AMG Petronas Formula One Team",
      carModel: "Mercedes-AMG F1 W13 E Performance",
      engine: "Mercedes-AMG F1 M13 E Performance",
      winsIn2023Season: 8,
      polePositionsIn2023Season: 10
    },
    
  ];

  return (
    <>
      <LandPage />
      <div>
        <h1>Formula 1 Entities</h1>
        <div>
          {entities.map((entity, index) => (
            <Entity key={index} entity={entity} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;