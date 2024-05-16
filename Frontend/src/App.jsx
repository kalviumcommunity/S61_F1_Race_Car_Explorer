import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandPage from './Components/LandPage';
import Entity from './Components/Entity';
import AddDataForm from './Components/AddDataForm';
import UpdateDataForm from './Components/UpdateDataForm';

function App() {
  return (
    <Router>
      <>
        <div>
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route path="/entities" element={<Entity />} />
            <Route path="/add" element={<AddDataForm />} />
            <Route path="/update" element={<UpdateDataForm />} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;