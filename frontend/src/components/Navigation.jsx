/*-- Citation for the following code: Nathaniel Dziuba
-- Date: 2025-08-05
-- Adapted from Exploration web app technology.
 */ 
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav className="App-nav">
            <Link to="/">Home Page</Link>
            <Link to="/adventurer">Adventurers</Link>
            <Link to="/job">Jobs</Link>
            <Link to="/location">Locations</Link>
            <Link to="/rank">Ranks</Link>
            <Link to="/adventurerJob">Active Adventurer's Jobs</Link>
        </nav>
    );
}

export default Navigation;