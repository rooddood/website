import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume">
      {/* About Me Section */}
      <div className="resume__section resume__section--about">
        <h2>About Me</h2>
        <div className="resume__content">
          <p>
            Full stack developer with extensive experience building
            sophisticated systems from the ground up and leading the software
            engineering growth of Resultid as Lead Developer.
          </p>
          <p>
            Fluent in Front End and Back End Engineering, Data Science, Cloud
            Engineering, and Machine Learning technologies. I excel as the
            go-to resource for solving any technical challenges.
          </p>
          <p>
            Combining technical acumen with leadership and communication
            skills, my real strength is a proven ability to organize teams
            around a well-defined common goal.
          </p>
          <p>
            With a Master’s in Computer Science from George Washington
            University, I am passionate about our environment and look to
            incorporate sustainable thinking in my work and personal life.
          </p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="resume__section resume__section--experience">
        <h2>Experience</h2>
        <div className="resume__content">
          <ul>
            <li>
              <strong>Lead Developer - Resultid</strong> (Sept 2020 - June 2024)
              <p>Leading Full Stack Software Development of Machine Learning and NLP Platform.</p>
              <ul>
                <li>Data Engineering</li>
                <li>Natural Language Processing</li>
                <li>Front End / Back End Development</li>
                <li>
                  Construction of complex visualizations to understand,
                  interpret, and predict.
                </li>
              </ul>
            </li>
            <li>
              <strong>Software Engineering Fellow - Navteca</strong> (June 2020 - Sept 2020)
              <p>Developed AWS infrastructure and Angular front end for scheduling EC2 instances.</p>
            </li>
            <li>
              <strong>Teaching Assistant - The George Washington University</strong> (Jan 2020 - Sept 2020)
              <p>
                Taught Python, Java, and algorithms/data structures. Ran
                weekly labs and office hours.
              </p>
            </li>
            <li>
              <strong>Machine Learning Researcher</strong> (Sept 2019 - May 2020)
              <p>
                Developed computer vision algorithms for a DARPA contract.
              </p>
            </li>
            <li>
              <strong>Software Engineering Intern - Linked Senior</strong> (Feb 2020 - June 2020)
              <p>
                Full-stack development of a React and Spring-based resident
                engagement platform.
              </p>
            </li>
            <li>
              <strong>Intern - DZYNE Technologies</strong> (May 2019 - Aug 2019)
              <p>
                Worked on DARPA contracts, built automated testing
                environments, and processed satellite imagery.
              </p>
            </li>
            <li>
              <strong>Research Assistant - The George Washington University</strong> (2017 - 2018)
              <p>
                Developed the AMOSeast website and used machine learning for
                image classification.
              </p>
            </li>
            <li>
              <strong>Sales Floor Team Member - Target</strong> (June 2017 - Aug 2017)
            </li>
            <li>
              <strong>Technical Sales Associate - The Mac Express</strong> (Jan 2016 - Aug 2016)
            </li>
          </ul>
        </div>
      </div>

      {/* Education Section */}
      <div className="resume__section resume__section--education">
        <h2>Education</h2>
        <div className="resume__content">
          <ul>
            <li>
              <strong>Master of Science (MS) - Computer Science</strong>
              <p>The George Washington University (Sept 2020 - May 2021)</p>
            </li>
            <li>
              <strong>Bachelor of Science (BS) - Computer Science</strong>
              <p>The George Washington University (Sept 2016 - May 2020)</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Skills Section */}
      <div className="resume__section resume__section--skills">
        <h2>Skills</h2>
        <div className="resume__content">
          <div className="resume__skills">
            <span className="resume__skill">JavaScript</span>
            <span className="resume__skill">React</span>
            <span className="resume__skill">Node.js</span>
            <span className="resume__skill">Python</span>
            <span className="resume__skill">Machine Learning</span>
            <span className="resume__skill">Data Visualization</span>
            <span className="resume__skill">AWS</span>
            <span className="resume__skill">NLP</span>
            <span className="resume__skill">Full Stack Development</span>
            <span className="resume__skill">Leadership</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

