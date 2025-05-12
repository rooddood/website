import React, { useState, useEffect } from 'react';
import './CodingProjects.css';

const CodingProjects = () => {
    const [expandedProject, setExpandedProject] = useState(null);

    const handleExpand = (index) => {
        setExpandedProject(index);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setExpandedProject(null);
    };

    const handleOutsideClick = (event) => {
        if (expandedProject !== null && !event.target.closest('.project-card.expanded')) {
            setExpandedProject(null);
        }
    };

    useEffect(() => {
        if (expandedProject !== null) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [expandedProject]);

    const projects = [
        {
            title: 'AmberVision',
            description: (
                <>
                    <p>As part of GW’s computer science program, every senior is required to work with a team on a capstone project. My team and I worked with Dr. Robert Pless to develop <a href="https://gw-cs-sd.github.io/sd-20-fernandez-rood-shah/" target="_blank" rel="noopener noreferrer">AmberVision</a>.</p>
                    <h5>Background</h5>
                    <p>AmberVision is one part of a solution to the question: how can we leverage existing technology to search for Amber Alert victims? AmberVision has a simple goal -- detect cars and display these detections to law enforcement.</p>
                    <h5>Tech</h5>
                    <p>We opted for a real-time object detection tool that allows law enforcement to view a web app and see the detected vehicles on the streets of DC.</p>
                    <h5>Data Collection</h5>
                    <p>We reached out to <a href="http://www.trafficland.com/" target="_blank" rel="noopener noreferrer">TrafficLand</a>, a company with a majority stake of traffic cameras in DC, to access their API for free from September 2019 to May 2020.</p>
                    <h5>Object Detection</h5>
                    <p>We used <a href="https://pjreddie.com/darknet/yolo/" target="_blank" rel="noopener noreferrer">You Only Look Once (YOLO)</a> for object detection due to its ideal speed and accuracy for our low-resolution traffic cameras.</p>
                    <h5>Color Detection</h5>
                    <p>We used PCA embedding to classify the RGB values and find the correlated colors, although it proved to be very difficult due to the grainy and low-res images.</p>
                    <h5>Results</h5>
                    <p>The image below shows detected cars, buses, and trucks in one frame with a different color based on each size.</p>
                    <div className="project-images">
                        <img src={`${process.env.PUBLIC_URL}/images/amber_vision_detection.png`} alt="AmberVision Image 1" />
                        <img src={`${process.env.PUBLIC_URL}/images/ambervision_webpage.jpg`} alt="AmberVision Image 2" />
                    </div>
                    <p>We created this project in Vue.js, showing a map of the location of the cameras in DC and the latest image with the vehicles detected.</p>
                    <h5>Technologies Used</h5>
                    <div className="technologies-used">
                        <span>Python Flask</span>
                        <span>MongoDB</span>
                        <span>Sklearn</span>
                        <span>cv2</span>
                        <span>Matplotlib</span>
                        <span>Pandas</span>
                        <span>Scipy</span>
                        <span>Vue.js</span>
                        <span>Leaflet</span>
                        <span>Axios</span>
                        <span>Bootstrap-Vue</span>
                        <span>Vanilla JS</span>
                        <span>HTML</span>
                    </div>
                    <h5>Why This is Important</h5>
                    <p>We demonstrated the powerful effect of using our skills for social good. Although we were unable to fully develop this project into a full-scale application, someone else can, with the ideas we started.</p>
                </>
            )
        },
        {
            title: 'AMOS: The Archive of Many Outdoor Scenes',
            description: (
                <>
                    <p>I worked on this project the bulk of my sophomore year of college. I reached out to a professor at the time and he allowed me to work on AMOS. It has been a very rewarding experience.</p>
                    <h5>Background</h5>
                    <p>The Archive of Many Outdoor Scenes (AMOS) is a collection of long-term time lapse imagery from publicly accessible outdoor web cams around the world. This research focuses on exploring how to use these images to learn about the world around us and understanding changes in natural environments and how people use public spaces. This project was built from the ground up using a Python web framework Flask. The dataset contains over 7,000 publicly accessible webcams and over 1,000,000 images.</p>
                    <p>The site is no longer live through GW's computer science department, but you can find the code on <a href="https://github.com/GWUvision/AMOSEast" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
                    <h5>Technologies Used</h5>
                    <div className="technologies-used">
                        <span>Python Flask</span>
                        <span>Threading</span>
                        <span>OpenCV</span>
                        <span>Numpy</span>
                        <span>PostgreSQL</span>
                        <span>HTML/CSS</span>
                    </div>
                </>
            )
        },
        {
            title: 'Script Writing App',
            description: (
                <>
                    <div className="project-logo">
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/voicescribe.png`} 
                            alt="Script Writing App Logo" 
                            style={{ display: 'block', margin: '0 auto', maxWidth: '200px' }} 
                        />
                    </div>
                    <p>This is an ongoing project that focuses on leveraging local AI models to assist users in script writing by converting voice input into formatted text.</p>
                    <h5>Background</h5>
                    <p>I spend a lot of time formatting my writing, and I thought this would be a great way to streamline the process. I can talk faster than I can type, so why not just do that?</p>
                    <h5>Current Features</h5>
                    <p>The app currently supports voice-to-text transcription using local AI models, which allows me to develop open source, without being tied to a specific company.</p>
                    <h5>In Progress</h5>
                    <p>I am working on auto formatting in different ways with AI. I want to allow the user to write any type of text, and have it correctly formatted, ready for copy and paste to another source.</p>
                    <h5>Technologies Used</h5>
                    <div className="technologies-used">
                        <span>Python</span>
                        <span>Local LLMs</span>
                        <span>Speech Recognition</span>
                        <span>React</span>
                        <span>HTML/CSS</span>
                    </div>
                    <h5>GitHub Repository</h5>
                    <p>You can find the code for this project on <a href="https://github.com/rooddood/script-writing-app" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
                </>
            )
        },
        {
            title: 'AI Contract Negotiator',
            description: (
                <>
                    <p>This tool is designed to explore the use of different models for automatic contract negotiation and generation. It leverages large language models (LLMs) from Hugging Face to facilitate these tasks.</p>
                    <h5>Background</h5>
                    <p>Using minimal input about the contractor and the hirer, this tool generates a contract that works for both parties. It is an innovative approach to simplifying contract creation and negotiation.</p>
                    <h5>Value and Potential Use</h5>
                    <p>The AI Contract Negotiator has the potential to revolutionize the way contracts are created and negotiated. By automating the process, it reduces the time and effort required to draft agreements, making it particularly valuable for small businesses, freelancers, and organizations that frequently deal with contracts. The tool ensures fairness and clarity in agreements, minimizing misunderstandings and disputes.</p>
                    <p>Additionally, the use of advanced language models allows for customization and adaptability, enabling the tool to cater to a wide range of industries and contract types. This makes it a versatile solution for modern contract management challenges.</p>
                    <h5>Technologies Used</h5>
                    <div className="technologies-used">
                        <span>Python</span>
                        <span>Hugging Face Models</span>
                        <span>Large Language Models (LLMs)</span>
                    </div>
                    <h5>GitHub Repository</h5>
                    <p>You can find the code for this project on <a href="https://github.com/rooddood/ai-contract-negotiator/tree/main" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
                </>
            )
        }
    ];

    return (
        <div className="coding-projects-container">
            <header className="coding-projects-header">
                <h1>Coding Projects</h1>
            </header>
            <section className="coding-projects-list">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`project-card ${expandedProject === index ? 'expanded' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleExpand(index); }}
                    >
                        <h3>{project.title}</h3>
                        {expandedProject === index && (
                            <>
                                <button className="close-btn" onClick={handleClose}>&times;</button>
                                <div className="project-details">
                                    {project.description}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default CodingProjects;
