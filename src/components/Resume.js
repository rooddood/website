// Resume.js
import React, { useState } from 'react';
import './Resume.css';

const Resume = () => {
  const workExperience = [
    {
      jobTitle: "Lead Developer, Resultid",
      dates: "Sep. 2021 - June 2024",
      skills: ["Python", "React", "AWS (pipelines+builds, Lambda, EC2, etc.)", "OpenAI + Local NLP models", "Jira / Linear", "SCRUM Master Certification"],
      resultsAchieved: "Created an advanced data science application in a greenfield setting, set up to run at scale. This involved working with local Natural Language Processing algorithms and hosted Large Language Models to answer abstract questions users had about any kind of text data. Worked closely with customer feedback to improve features and design. Additionally, led establishment and evolution of agile development practices in a growing startup environment."
    },
    {
      jobTitle: "Lead Machine Learning Researcher, The George Washington University",
      dates: "Dec. 2017 - May 2021",
      skills: ["Python", "AWS", "Computer Vision", "Big Data + Databases"],
      resultsAchieved: "Performed water depth estimation of flooded cities using multiband satellite imagery. Helped DZYNE Technologies with an ongoing DARPA project aiming to use overhead imagery to assist in response to natural disasters by routing first responders to accessible roads/routes. Developed FE and BE of Archive of Many Outdoor Scenes (AMOS), a website to collect, categorize, and display images from free webcams posted around the world. Eventually collected a database of over 3,000 cameras and over 1 billion images from these cameras. This is not only a unique Computer Vision dataset, but was used as training data in experimentation in our lab."
    },
    {
      jobTitle: "Software Engineering Intern, Navteca",
      dates: "May 2020 - Sep. 2020",
      skills: ["Angular", "AWS (Lambda, EC2)", "Unity"],
      resultsAchieved: "Built Unity based extraction of geographical metadata from Geotiff files in order to determine precise spatial information. Was used as part of Virtual Reality visualizations surrounding floods and other natural disasters. Also began building out AWS Lambda internal scheduling system."
    },
    {
      jobTitle: "Software Engineering Intern, LinkedSenior",
      dates: "Feb. 2020 - May 2020",
      skills: ["React", "Java Spring"],
      resultsAchieved: "Full Stack development of a resident engagement platform for nursing homes. Fixing up and building out memory games and social activities for residents with dementia."
    },
    {
      jobTitle: "Software Engineering Intern, Dzyne Technologies",
      dates: "May 2019 - Sep. 2019",
      skills: ["Python", "Docker", "AWS (Lambda, EC2)", "Computer Vision"],
      resultsAchieved: "Assembled cloud based testing and integration infrastructure for Machine Learning and Computer Vision models in a greenfield environment. This was used as part of an ongoing DARPA project involving disaster relief assessment."
    },
    {
      jobTitle: "Python Teaching Assistant, The George Washington University",
      dates: "Sep. 2018 - May 2021",
      skills: ["Python", "Big Data + Databases", "Communication"],
      resultsAchieved: "Preparing and teaching Python to non CS major students with a focus on data analytics. Holding office hours to help struggling students. Communicating technical ideas to non technical people is one of my strengths."
    }
  ];

  const education = {
    university: "The George Washington University",
    degrees: [
      { degree: "Masters in Computer Science w/ Concentration in Artificial Intelligence", date: "May 2021", gpa: "4.0" },
      { degree: "Bachelors of Science in Computer Science, Minor in Sustainability", date: "May 2020", gpa: "3.7" }
    ]
  };

  const otherInterests = [
    "Film Photography",
    "Creative writing (novel and script)",
    "Designing + implementing recipes (cooking)",
    "Making + selling clothes"
  ];

  const skills = [
    "Python", "React", "AWS (Lambda, EC2, etc.)", "OpenAI + Local NLP models",
    "AWS Pipelines + Builds", "Jira / Linear", "SCRUM Master Certification",
    "Computer Vision", "Big Data + Databases", "Angular", "Java Spring", "Unity", "Docker"
  ];

  const [expandedItem, setExpandedItem] = useState(null);

  const handleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleDownload = () => {
    // Replace 'resume.pdf' with the path to your actual resume file
    const resumePath = '/Kyle_Rood_Resume_2024_Freelance.pdf';
    window.open(resumePath, '_blank');
  };

  return (
    <div className="resume">
      <header className="resume__header">
        <img src="/images/about.jpg" alt="Profile Picture" className="resume__profile-pic" />
        <br /><br /><br /><h1>Kyle Rood</h1>
        <p className="resume__tagline">Freelance AI Software Developer / Engineering Manager</p>
        <div className="resume__contact">
          <p>Email: kylerood16@gmail.com</p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/kyle-rood/" target="_blank" rel="noopener noreferrer">Kyle Rood</a></p>
          <button className="home__download-btn" onClick={handleDownload}>Download Resume</button>
        </div>
      </header>

      <section className="resume__section">
        <h2 className="resume__section-title">Experience</h2>
        <ul className="resume__list">
          {workExperience.map((experience, index) => (
            <li key={index} className={`resume__item ${expandedItem === index ? 'expanded' : ''}`} onClick={() => handleExpand(index)}>
              <div className="resume__item-header">
                {experience.jobTitle} <br />
                {experience.dates} <br />
                <div className="resume__tags">
                  {experience.skills.map((skill, idx) => (
                    <span key={idx} className="resume__tag">{skill}</span>
                  ))}
                </div>
              </div>
              {expandedItem === index && (
                <div className="resume__item-details">
                  {experience.resultsAchieved}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume__section">
        <h2 className="resume__section-title">Education</h2>
        <ul className="resume__list">
          {education.degrees.map((degree, index) => (
            <li key={index} className={`resume__item ${expandedItem === `edu-${index}` ? 'expanded' : ''}`} onClick={() => handleExpand(`edu-${index}`)}>
              <div className="resume__item-header">
                {degree.degree}, {education.university} <br />
                Graduated: {degree.date} <br />
                GPA: {degree.gpa}
              </div>
              {expandedItem === `edu-${index}` && (
                <div className="resume__item-details"></div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume__section">
        <h2 className="resume__section-title">Skills</h2>
        <div className="resume__skills">
          {skills.map((skill, index) => (
            <span key={index} className="resume__skill">{skill}</span>
          ))}
        </div>
      </section>

      <section className="resume__section">
        <h2 className="resume__section-title">Other Interests</h2>
        <ul className="resume__list">
          {otherInterests.map((interest, index) => (
            <li key={index} className="resume__item-bubble">{interest}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Resume;
