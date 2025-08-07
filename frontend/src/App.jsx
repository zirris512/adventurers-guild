/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration web app technology.
 */
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AdventurerPage from './pages/AdventurerPage';
import LocationPage from './pages/LocationPage';
import RankPage from './pages/RankPage';
import AdventurerJobPage from './pages/AdventurerJobPage';
import JobPage from './pages/JobPage';

// Define the backend port and URL for API requests
const backendPort = 50101;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  //   const [editId, exSel] = useState([]);

  return (
    <>
      <header>
        <h1>Adventurer's Guild</h1>
        <p>Guild Job Board</p>
      </header>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage backendURL = {backendURL}/>}></Route>
          <Route path="/adventurer" element={<AdventurerPage backendURL = {backendURL}/>}></Route>
          <Route path="/location" element={<LocationPage backendURL = {backendURL}/>}></Route>
          <Route path="/rank" element={<RankPage backendURL = {backendURL}/>}></Route>
          <Route path="/job" element={<JobPage backendURL = {backendURL}/>}></Route>
          <Route
            path="/adventurerJob/:id?"
            element={<AdventurerJobPage backendURL = {backendURL}/>}
          ></Route>
        </Routes>
      </div>
      <footer>© 2025 Group24</footer>
    </>
  );
}

export default App;
