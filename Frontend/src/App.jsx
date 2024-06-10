import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandPage from './Components/LandPage';
import Entity from './Components/Entity';
import AddDataForm from './Components/AddDataForm';
import UpdateDataForm from './Components/UpdateDataForm';
import Login from './Components/Login';
import Logout from './Components/Logout';

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
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;