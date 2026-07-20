import React from 'react';
import './Production.css';

const Production = () => {
  return (
    <div className="production-page">
      <header className="production-header">
        <h1>Production</h1>
      </header>

      <section className="production-skills">
        <h2>Skills & Services</h2>
        <div className="skills-container">
          <div className="skill-card">
            <h3>Editing</h3>
            <p>Professional video editing to craft compelling narratives, perfect timing, and seamless clean cuts.</p>
          </div>
          <div className="skill-card">
            <h3>Post Production</h3>
            <p>Color grading, sound mixing, and final visual polish to make your project truly shine.</p>
          </div>
        </div>
      </section>

      <section className="production-coming-soon">
        <h2>Coming Soon: Filming & Recording</h2>
        <p>In addition to editing, I will soon be offering filming and recording services for client projects! I have a few shoots in the works and will be posting the clips here soon.</p>
      </section>

      <section className="production-portfolio">
        <h2>Portfolio</h2>
        <div className="portfolio-placeholder">
          <p>My production portfolio is currently under construction. Check back soon for examples of my recent work!</p>
        </div>
      </section>
    </div>
  );
};

export default Production;
