import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Photography from './components/Photography';
import Clothing from './components/Clothing';
import Cooking from './components/Cooking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/photography">Photography</Link></li>
            <li><Link to="/clothing">Clothing</Link></li>
            <li><Link to="/cooking">Cooking</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/cooking" element={<Cooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;