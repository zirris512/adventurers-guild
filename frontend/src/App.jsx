import { React, useState, useEffect } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AdventurerPage from './pages/AdventurerPage';
import LocationPage from './pages/LocationPage';
import RankPage from './pages/RankPage';
import AdventurerJobPage from './pages/AdventurerJobPage';
import JobPage from './pages/JobPage';



function App() {
  const [editId, exSel] = useState([]);

  return (
    <>
      <header>
      <h1>Adventurer's Guild</h1>
      <p>Guild Job Board</p>
      </header>
    <div className = "app">
        <Navigation/>
        <Routes>
          <Route path = "/" element = {<HomePage/>}></Route>
          <Route path = "/adventurer" element = {<AdventurerPage/>}></Route>
          <Route path = "/location" element = {<LocationPage/>}></Route>
          <Route path = "/rank" element = {<RankPage/>}></Route>
          <Route path = "/job" element = {<JobPage/>}></Route>
          <Route path = "/adventurerJob" element = {<AdventurerJobPage/>}></Route>
        </Routes>
    </div>
    <footer>© 2025 Group24</footer>
    </>
  );
}

export default App;
