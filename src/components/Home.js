import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to My Digital Resume</h1>
      <p>Hi, I'm [Your Name], a [Your Profession].</p>
      <section>
        <h2>Experience</h2>
        <ul>
          <li>Job 1 - Description</li>
          <li>Job 2 - Description</li>
          <li>Job 3 - Description</li>
        </ul>
      </section>
      <section>
        <h2>Education</h2>
        <ul>
          <li>Degree 1 - School</li>
          <li>Degree 2 - School</li>
        </ul>
      </section>
      <section>
        <h2>Skills</h2>
        <ul>
          <li>Skill 1</li>
          <li>Skill 2</li>
          <li>Skill 3</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
