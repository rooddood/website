// Home.js
import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  const handleDownload = () => {
    const resumePath = process.env.PUBLIC_URL + '/Kyle_Rood_Resume_2025.pdf';
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
        <button className="home__download-btn" onClick={handleDownload}>Download Resume</button>
      </header>
    </div>
  );
};

export default Home;
