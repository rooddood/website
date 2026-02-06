// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from './components/Home';
import Clothing from './components/Clothing';
import Cooking from './components/Cooking';
import Meme from './components/Meme';
import Shops from './components/Shops';
import LitVids from './components/LitVids';
import Freelance from './components/Freelance';
import Resume from './components/Resume';
import CodingProjects from './components/CodingProjects';
import NavBar from './components/NavBar';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Include NavBar component here */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page at / and /website*/}
          <Route path="/website/" element={<Home />} /> {/* Always need to start here for some reason*/}
          <Route path="/resume" element={<Resume />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/projects" element={<CodingProjects />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/meme" element={<Meme />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/litvids" element={<LitVids />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
