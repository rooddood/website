// Home.js
import React from 'react';
import './Home.css';
import SkillsSection from './SkillsSection';

const Home = () => {
  const handleDownload = () => {
    const resumePath = process.env.PUBLIC_URL + '/Kyle_Rood_Resume_25.pdf';
    window.open(resumePath, '_blank');
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1>Hi, I'm Kyle Rood</h1>
        <p className="home__tagline">AI Software Developer / Engineering Manager.</p>
        <div className="home__contact">
          <p>Email: kylerood16@gmail.com</p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/kyle-rood/" target="_blank" rel="noopener noreferrer">Kyle Rood</a></p>
        </div>
        <div className="home__resume-skills-row">
          <button className="home__download-btn" onClick={handleDownload}>Download Resume</button>
          <div className="home__skills-inline">
            <SkillsSection defaultExpanded={false} blue={true} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
