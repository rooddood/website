import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home">
      <header className="home__header">
        <h1>Welcome to My Digital Resume</h1>
        <p className="home__tagline">Hi, I'm [Your Name], a [Your Profession].</p>
      </header>
      
      <section className="home__section">
        <h2 className="home__section-title">Experience</h2>
        <ul className="home__list">
          <li>
            Job 1 - Description
            <span className="hidden-detail"> More details about Job 1.</span>
          </li>
          <li>
            Job 2 - Description
            <span className="hidden-detail"> More details about Job 2.</span>
          </li>
          <li>
            Job 3 - Description
            <span className="hidden-detail"> More details about Job 3.</span>
          </li>
        </ul>
      </section>
      
      <section className="home__section">
        <h2 className="home__section-title">Education</h2>
        <ul className="home__list">
          <li>Degree 1 - School</li>
          <li>Degree 2 - School</li>
        </ul>
      </section>
      
      <section className="home__section">
        <h2 className="home__section-title">Skills</h2>
        <ul className="skills__list">
          <li className="skills__item">
            <i className="fas fa-code"></i>
            <span>Programming Languages</span>
          </li>
          <li className="skills__item">
            <i className="fas fa-laptop"></i>
            <span>Web Development</span>
          </li>
          <li className="skills__item">
            <i className="fas fa-camera"></i>
            <span>Photography</span>
          </li>
          {/* Add more skills items as needed */}
        </ul>
      </section>
    </div>
  );
};

export default Home;