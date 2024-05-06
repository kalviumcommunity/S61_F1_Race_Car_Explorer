import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandPage from './Components/LandPage';
import Entity from './Components/Entity';
import entityData from './Components/entityData.json';
import AddDataForm from './Components/AddDataForm';

function App() {
  return (
    <>
      {/* <LandPage />
      <div className="entity-list">
        {entityData.map((entity, index) => (
          <Entity key={index} {...entity} />
        ))}
      </div> */}
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="/entities" element={<Entity />} />
          <Route path="/add" element={<AddDataForm />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
