// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from './components/Home';
import Photography from './components/Photography';
import Clothing from './components/Clothing';
import Cooking from './components/Cooking';
import Resume from './components/Resume'; // Import Resume component
import NavBar from './components/NavBar'; // Import NavBar component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Include NavBar component here */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page at / */}
          <Route path="/resume" element={<Resume />} /> {/* Resume page at /resume */}
          <Route path="/photography" element={<Photography />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/cooking" element={<Cooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
