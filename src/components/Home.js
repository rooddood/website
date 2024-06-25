import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  // Work experience data
  const workExperience = [
    {
      jobTitle: "Lead Developer, Resultid",
      dates: "Sept. 2021 - June 2024",
      skills: "Python, React, AWS (pipelines+builds, Lambda, EC2, etc.), OpenAI + Local NLP models, Jira / Linear, SCRUM Master Certification (2021)",
      resultsAchieved: "Full stack development of advanced data science website, set up and managed AWS infrastructure, leveraging NLP models to pull out relationships in text. Improved user interface through design and implementation. Started and Led SCRUM sprint practices for 2 years."
    },
    {
      jobTitle: "Software Engineering Intern, Navteca",
      dates: "May 2020 - Sept. 2020",
      skills: "Angular, AWS (EC2), Unity",
      resultsAchieved: "Developed Angular based scheduler, Unity based extraction of geographical metadata from Geotiff files to determine precise spatial information."
    },
    {
      jobTitle: "Software Engineering Intern, LinkedSenior",
      dates: "Feb. 2020 - May 2020",
      skills: "React, Java Spring",
      resultsAchieved: "Built out functionality for resident engagement platform for nursing homes."
    },
    {
      jobTitle: "Software Engineering Intern, Dzyne Technologies",
      dates: "May 2019 - Sept. 2019",
      skills: "Python, Docker, AWS (Lambda)",
      resultsAchieved: "Built environment to automate testing of different Computer Vision algorithms using DigitalGlobe imagery and Docker."
    },
    {
      jobTitle: "Lead Machine Learning Researcher, The George Washington University",
      dates: "Dec. 2017 - May 2021",
      skills: "Python, Computer Vision, Big Data + Databases",
      resultsAchieved: "Performed water depth estimation using multiband satellite imagery. Developed FE and BE of AMOSEast website to collect and categorize images from webcams worldwide. Led a project collecting over 1 billion images from 3,000 cameras."
    },
    {
      jobTitle: "Python Teaching Assistant, The George Washington University",
      dates: "Sept. 2018 - May 2021",
      skills: "Python, Computer Vision, Big Data + Databases",
      resultsAchieved: "Conducted weekly labs teaching Python to non-CS majors, with a focus on data analytics. Provided office hours support and bridged technical concepts to non-technical students."
    }
  ];

  // Education data
  const education = {
    university: "The George Washington University",
    degrees: [
      { degree: "Bachelors of Science in Computer Science", date: "May 2020", gpa: "3.7" },
      { degree: "Masters in Computer Science w/ Concentration in Artificial Intelligence", date: "May 2021", gpa: "4.0" }
    ]
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1>Welcome to My Digital Resume</h1>
        <p className="home__tagline">Hi, I'm Kyle Rood, a Freelance AI Software Developer / Engineering Manager.</p>
        <div className="home__contact">
          <p>Email: kylerood16@gmail.com</p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/kyle-rood/" target="_blank" rel="noopener noreferrer">Kyle Rood</a></p>
          <p>Website: <a href="https://krood20.github.io/website/" target="_blank" rel="noopener noreferrer">krood20.github.io/website</a></p>
        </div>
      </header>

      <section className="home__section">
        <h2 className="home__section-title">Experience</h2>
        <ul className="home__list">
          {workExperience.map((experience, index) => (
            <li key={index}>
              <strong>{experience.jobTitle}</strong> <br />
              {experience.dates} <br />
              <strong>Skills:</strong> {experience.skills} <br />
              {experience.resultsAchieved}
            </li>
          ))}
        </ul>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">Education</h2>
        <ul className="home__list">
          {education.degrees.map((degree, index) => (
            <li key={index}>
              {degree.degree}, {education.university} <br />
              Graduated: {degree.date} <br />
              GPA: {degree.gpa}
            </li>
          ))}
        </ul>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">Skills</h2>
        <ul className="skills__list">
          <li className="skills__item">
            <i className="fas fa-code"></i>
            <span>Python, React, Angular, Java Spring</span>
          </li>
          <li className="skills__item">
            <i className="fab fa-aws"></i>
            <span>AWS (Lambda, EC2, etc.), AWS Pipelines + Builds</span>
          </li>
          <li className="skills__item">
            <i className="fas fa-brain"></i>
            <span>OpenAI, Local NLP models</span>
          </li>
          <li className="skills__item">
            <i className="fas fa-tasks"></i>
            <span>Jira, Linear, SCRUM Master Certification</span>
          </li>
          {/* Add more skills items as needed */}
        </ul>
      </section>
    </div>
  );
};

export default Home;