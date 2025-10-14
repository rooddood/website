import React from 'react';
import './Freelance.css';
import './TagBubble.css';

const Freelance = () => {
    const projects = [
        {
            company: "Nodus",
            skills: ["Python", "Docker", "Next.JS", "Anthropic Claude"]
        },
        {
            company: "Hilltop-App",
            skills: ["Python", "Next.JS", "Angular", "GCP", "OpenAI LLM"]
        },
        {
            company: "Strategic Solutions Research",
            skills: ["Python", "React", "Wordpress"]
        }
    ];

    const handleDownload = () => {
        const resumePath = process.env.PUBLIC_URL + '/Kyle_Rood_Resume_25.pdf';
        window.open(resumePath, '_blank');
      };

    return (
        <div className="freelance-container">
            <header className="freelance-header">
                <h1>Kyle Rood</h1>
                <h2>AI Software Developer | Remote / Washington D.C.</h2>
            </header>

            <section className="freelance-about">
                <h2>About Me</h2>
                <p>With a Master’s in Computer Science and years of experience as a lead developer and engineering manager, 
                    I specialize in creating scalable websites using bleeding edge tools for businesses and individuals.</p>     
                <p>My technical expertise includes Python, React, AWS, and advanced AI/ML applications, allowing me to deliver 
                    tailored solutions that meet both technical and business goals.</p>

                <button className="home__download-btn" onClick={handleDownload}>Download Resume</button>
            </section>
            <br/>

            <section className="freelance-projects">
                <h2>Recent Projects</h2>
                <div className="projects-container">
                    {projects.map((project, index) => (
                        <div key={index} className="resume__section">
                            <h3>{project.company}</h3>
                            <div className="skill-tag-container">
                                {project.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <br/>
            <br/>

            <footer className="freelance-footer">
                <h2>Contact Me</h2>
                <section className="freelance-links">
                    <p>You can reach me about inquiries on Fiverr or Upwork, or at this email: <a href="mailto:kylerood16@gmail.com">kylerood16@gmail.com</a>.</p>
                    <a href="https://www.upwork.com/freelancers/~013ea7305f186f0b3d?mp_source=share" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/upwork-logo.png`} alt="Upwork" />
                    </a>
                    <a href="https://www.fiverr.com/s/WE3pj2B" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/fiverr-logo.png`} alt="Fiverr" />
                    </a>
                </section>
            </footer>
        </div>
    );
};

export default Freelance;
