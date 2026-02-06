import React, { useState, useRef, useLayoutEffect } from "react";

import "./Resume.css";


const experiences = [
  // Newest roles (2024-2025)
  {
    jobTitle: "Full Stack Implementation Engineer",
    company: "Strategic Solutions Research",
    title: "Full Stack Implementation Engineer - Strategic Solutions Research",
    date: "Dec. 2024 - Now",
    description: "Architected and developed advanced data visualization tools in React, automating client report generation. Designed and built scalable Python ETL pipelines, reducing client reporting time and improving data accessibility. Developed and deployed custom Topic Modeling and Sentiment Analysis models using BERT via HuggingFace, increasing the depth of client insights and reducing operational costs.",
    details: [
      "Python / React / HuggingFace / BERT / AWS / Anthropic Claude / Wordpress / Writing",
      "Architected + developed advanced data visualization tools in React, automating client report generation",
      "Designed + built scalable Python ETL pipelines, reducing client reporting time + improving data accessibility",
      "Developed and deployed custom Topic Modeling + Sentiment Analysis models using BERT model via HuggingFace, increasing the depth of client insights and reducing operational costs"
    ]
  },
  {
    jobTitle: "Full Stack AI Developer",
    company: "Nodus",
    title: "Full Stack AI Developer - Nodus",
    date: "Mar. 2025 - May 2025",
    description: "Advised team on AI Agents and future AI implementations. Implemented Python (pydantic-AI) based MCP server to source information from the internet. Integrated with Docker-based Next.JS deployment.",
    details: [
      "Python / Docker / Next.JS / Anthropic Claude",
      "AI Agent architecture and implementation",
      "MCP server for internet-sourced information",
      "Integration with Docker-based Next.JS"
    ]
  },
  {
    jobTitle: "Full Stack AI Engineer",
    company: "Hilltop-App",
    title: "Full Stack AI Engineer - Hilltop-App",
    date: "Feb. 2025 - Mar. 2025",
    description: "Rebuilt UI for a Next.js/Angular application in context-aware AI assistant, improving user experience and engagement. Applied AI infrastructure (LangChain + RAG) to connect legislative data, automating contextual message generation. Developed Python testing frameworks to ground agent responses, ensuring accuracy and context relevance.",
    details: [
      "Python / Next.JS / Angular / GCP / Gemini / OpenAI / MCP / RAG / LangChain / Prompt Engineering",
      "Rebuilt UI for a Next.js/Angular application in context-aware AI assistant, improving user experience + engagement",
      "Applied AI infrastructure (LangChain + RAG) to connect legislative data, automating contextual message generation",
      "Developed Python testing frameworks to ground agent responses, ensuring accuracy and context relevance"
    ]
  },
  // Updated Resultid experience (with growth path)
  {
    jobTitle: "Engineering Intern → Full Stack Engineer → Lead Engineer",
    company: "Resultid",
    title: "Engineering Intern → Full Stack Engineer → Lead Engineer - Resultid",
    date: "Sep. 2021 - June 2024",
    description: "Led and mentored a growing team of engineers, establishing Agile development practices and maintaining high engineering standards using GitHub+AWS workflows (CI/CD). Designed and built a scalable data science application leveraging AWS to process thousands of documents weekly. Trained and hosted custom NLP algorithms on AWS EC2, increasing model performance and reducing latency. Interfaced directly with customers to integrate feedback into features, resulting in an increase in user retention.",
    details: [
      "Python / React / AWS / OpenAI / BERT / Docker / SQL / NoSQL / Git / CI/CD / Leadership",
      "Led + mentored growing team of engineers, establishing Agile development practices and maintaining high engineering standards using GitHub+AWS workflows (CI/CD)",
      "Designed + built a scalable data science application leveraging AWS to process thousands of  documents weekly",
      "Trained + hosted custom NLP algorithms on AWS EC2, increasing model performance + reducing latency",
      "Interfaced directly with customers to integrate feedback into features, resulting in an increase in user retention"
    ]
  },
  // GWU Research Assistant (expanded)
  {
    jobTitle: "Research Assistant → Lead ML Research Asst.",
    company: "The George Washington University",
    title: "Research Assistant → Lead ML Research Asst. - The George Washington University",
    date: "Dec. 2017 - May 2021",
    description: "Collaborated on a DARPA project, developing a data-driven solution that reduced first responder time on-scene. Full-Stack development of AMOS, a big data system that collected and categorized over 1 billion images from thousands of cameras. Performed water depth estimation on a flooded city using multiband satellite imagery, providing critical data for disaster relief efforts.",
    details: [
      "Research / Python / AWS / Computer Vision / Big Data / SQL / NoSQL (MongoDB)",
      "Collaborated on a DARPA project, developing a data-driven solution that reduced first responder time on-scene",
      "Full-Stack development of AMOS, a big data system that collected + categorized over 1 billion images from thousands of cameras",
      "Performed water depth estimation on a flooded city using multiband satellite imagery, providing critical data for disaster relief efforts"
    ]
  },
  // Python TA (expanded)
  {
    jobTitle: "Python Teaching Assistant",
    company: "The George Washington University",
    title: "Python Teaching Assistant - The George Washington University",
    date: "Sep. 2018 - May 2021",
    description: "Designed and delivered curriculum on Python for data analytics including Numpy, Pandas, and Scikit-learn. Empowered non-CS students to apply foundational programming concepts to real-world datasets. Held regular office hours to provide one-on-one mentorship, increasing student confidence and comprehension.",
    details: [
      "Python / Big Data / Databases / Data Science / Communication / Leadership / Teaching",
      "Designed + delivered curriculum on Python for data analytics including Numpy, Pandas, and Scikit-learn",
      "Empowered non-CS students to apply foundational programming concepts to real-world datasets",
      "Held regular office hours to provide one-on-one mentorship, increasing student confidence + comprehension"
    ]
  },
  // Compressed internships & research
  {
    jobTitle: "Lead Machine Learning Researcher",
    company: "The George Washington University",
    title: "Lead Machine Learning Researcher - The George Washington University",
    date: "Dec. 2017 - May 2021",
    description: "Performed water depth estimation of flooded cities using overhead multiband satellite imagery. Helped DZYNE Technologies with an ongoing DARPA project aiming to to assist in response to natural disasters by routing first responders to accessible roads/routes. Developed FE and BE of Archive of Many Outdoor Scenes (AMOS), a website to collect, categorize, and display images from free webcams posted around the world. Eventually collected a database of over 3,000 cameras and over 1 billion images from these cameras.",
    details: [
      "Python, AWS, Computer Vision, Big Data + Databases"
    ]
  },
  {
    jobTitle: "Software Engineering Intern",
    company: "Navteca",
    title: "Software Engineering Intern - Navteca",
    date: "May 2020 - Sep. 2020",
    description: "Built Unity based extraction of geographical metadata from Geotiff files. This was used to determine precise spatial information for Virtual Reality visualizations of floods and other natural disasters. Built out AWS Lambda internal scheduling system.",
    details: [
      "Angular, AWS (Lambda, EC2), Unity"
    ]
  },
  {
    jobTitle: "Software Engineering Intern",
    company: "LinkedSenior",
    title: "Software Engineering Intern - LinkedSenior",
    date: "Feb. 2020 - May 2020",
    description: "Full Stack development of a resident engagement platform for nursing homes. Fixing and building memory games and social activities for residents with dementia.",
    details: [
      "React, Java Spring"
    ]
  },
  {
    jobTitle: "Software Engineering Intern",
    company: "DZYNE Technologies",
    title: "Software Engineering Intern - DZYNE Technologies",
    date: "May 2019 - Sep. 2019",
    description: "Assembled cloud based testing and integration for Machine Learning and Computer Vision models in a greenfield environment. Used as part of an ongoing DARPA project involving disaster relief assessment.",
    details: [
      "Python, Docker, AWS (Lambda, EC2), Computer Vision"
    ]
  },
  // Legacy/other roles (compressed)
  {
    jobTitle: "Research Assistant",
    company: "The George Washington University",
    title: "Research Assistant - The George Washington University",
    date: "2017 - 2018",
    description: "Developed the AMOSeast website and used machine learning for image classification."
  },
  {
    jobTitle: "Sales Floor Team Member",
    company: "Target",
    title: "Sales Floor Team Member - Target",
    date: "June 2017 - Aug 2017",
    description: "Retail experience."
  },
  {
    jobTitle: "Technical Sales Associate",
    company: "The Mac Express",
    title: "Technical Sales Associate - The Mac Express",
    date: "Jan 2016 - Aug 2016",
    description: "Technical sales and customer support."
  }
];


// Helper to extract the earliest year from a date string
function getStartYear(dateStr) {
  const match = dateStr.match(/\d{4}/g);
  return match ? parseInt(match[0], 10) : 0;
}
function getStartMonthYear(dateStr) {
  // e.g. "Sept 2020 - June 2024" => "Sept 2020"
  return dateStr.split("-")[0].trim();
}
function getEndMonthYear(dateStr) {
  // e.g. "Sept 2020 - June 2024" => "June 2024"
  const parts = dateStr.split("-");
  return parts.length > 1 ? parts[1].trim() : "";
}

// Helper to extract the latest year from a date string (for end placement)
function getEndYear(dateStr) {
  const match = dateStr.match(/\d{4}/g);
  if (!match) return getStartYear(dateStr);
  return match.length > 1 ? parseInt(match[match.length - 1], 10) : parseInt(match[0], 10);
}

// Sort experiences by end year ascending (oldest first)
const sortedExperiences = [...experiences].sort(
  (a, b) => getEndYear(a.date) - getEndYear(b.date)
);

// Get min/max years for proportional spacing (use end years)
const years = sortedExperiences.map(exp => getEndYear(exp.date));
const minYear = Math.min(...years);
// Ensure timeline goes to at least 2026 if any experience is in 2025
const maxYear = Math.max(...years, 2026);
const yearRange = maxYear - minYear || 1; // avoid div by zero

// Custom mapping: 2016-2019 compressed to first 20%, 2020-2021 to next 25%, 2022-2024 compressed to next 30%, 2025+ expanded to last 25%
function getTimelinePosition(endYear) {
  if (endYear < 2020) {
    // 2016-2019: compressed into first 20%
    const compressedMin = 2016;
    const compressedMax = 2019;
    const compressedRange = compressedMax - compressedMin || 1;
    return ((endYear - compressedMin) / compressedRange) * 20;
  } else if (endYear < 2022) {
    // 2020-2021: next 25%
    const rangeMin = 2020;
    const rangeMax = 2021;
    const range = rangeMax - rangeMin || 1;
    return 20 + ((endYear - rangeMin) / range) * 25;
  } else if (endYear < 2025) {
    // 2022-2024: compressed into next 30%
    const rangeMin = 2022;
    const rangeMax = 2024;
    const range = rangeMax - rangeMin || 1;
    return 45 + ((endYear - rangeMin) / range) * 30;
  } else {
    // 2025+: last 25%
    const rangeMin = 2025;
    const rangeMax = maxYear;
    const range = rangeMax - rangeMin || 1;
    return 75 + ((endYear - rangeMin) / range) * 25;
  }
}

const Resume = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [openExperiences, setOpenExperiences] = useState(
    Array(experiences.length).fill(false)
  );

  // Map sorted index to original index for correct toggle
  const sortedToOriginalIdx = sortedExperiences.map(exp =>
    experiences.findIndex(e => e.title === exp.title && e.date === exp.date)
  );

  // Download Resume handler (from Home.js)
  const handleDownload = () => {
    const resumePath = process.env.PUBLIC_URL + '/Kyle_Rood_Resume_25.pdf';
    window.open(resumePath, '_blank');
  };

  const toggleExperience = (idx) => {
    setOpenExperiences((prev) =>
      prev.map((open, i) => (i === sortedToOriginalIdx[idx] ? !open : open))
    );
  };

  // For timeline years (use minYear to maxYear)
  const timelineYears = [];
  for (let y = minYear; y <= maxYear; y++) {
    timelineYears.push(y);
  }

  // Calculate label positions: linear mapping by start year, but enforce a minimum gap to avoid overlap
  const minLabelGap = 7; // percent, minimum gap between labels

  let lastPos = -minLabelGap;
  const labelPositions = sortedExperiences.map((exp, idx) => {
    const endYear = getEndYear(exp.date);
    let pos = getTimelinePosition(endYear);
    if (pos - lastPos < minLabelGap) {
      pos = lastPos + minLabelGap;
    }
    if (pos > 100) pos = 100;
    if (pos < 0) pos = 0;
    lastPos = pos;
    return pos;
  });

  // --- Begin: Dynamic label spacing logic ---
  // Create refs for each label
  const labelRefs = useRef([]);
  // Store measured heights for each label
  const [labelHeights, setLabelHeights] = useState([]);

  useLayoutEffect(() => {
    // Measure heights after render
    const heights = labelRefs.current.map(ref => ref ? ref.offsetHeight : 0);
    setLabelHeights(heights);
  }, [openExperiences, sortedExperiences]);
  // --- End: Dynamic label spacing logic ---

  return (
    <div className="resume resume--compressed">
      {/* About Me & Education at the Top, collapsible, two columns, with Download Resume and SkillsSection */}
      <div className="resume__section resume__section--top resume__section--compressed">
        <div className="resume__about-block resume__collapsible resume__compressed-block">
          <div className="resume__collapsible-header" onClick={() => setShowAbout((v) => !v)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <h2 style={{ textAlign: 'center', flex: '1 1 0', margin: 0 }}>About Me & Education</h2>
            <button className="resume__toggle-btn" aria-label="Toggle About Me">{showAbout ? '−' : '+'}</button>
          </div>
          {showAbout && (
            <div className="resume__content resume__content--compressed resume__about-education-columns" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              {/* Left column: About Me + Download Resume */}
              <div className="resume__aboutme-col" style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%' }}>
                  <p style={{ textAlign: 'center' }}>
                    Full stack implementation engineer and AI developer with a proven record of architecting advanced data visualization tools, scalable ETL pipelines, and custom NLP/AI solutions for clients and research teams.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    Experienced in leading engineering teams, mentoring, and establishing Agile practices. Passionate about leveraging AI, cloud, and data science to solve real-world problems and deliver actionable insights.
                  </p>
                  <p style={{ textAlign: 'center' }}>
                    Strong communicator and educator, with a background in teaching Python, data science, and empowering non-CS students to apply programming to real-world datasets.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', justifyContent: 'center' }}>
                  <button className="home__download-btn" onClick={handleDownload}>Download Resume</button>
                  <div className="home__skills-inline">
                    {/* eslint-disable-next-line */}
                    {require('./SkillsSection').default ? React.createElement(require('./SkillsSection').default, { defaultExpanded: false, blue: true }) : null}
                  </div>
                </div>
              </div>
              {/* Right column: Education, Certifications, Community, Creativity */}
              <div className="resume__education-col" style={{ flex: '1 1 260px', minWidth: 0 }}>
                <p>
                  <strong>Masters in Computer Science, Concentration in Artificial Intelligence</strong>
                  <br />The George Washington University, GPA: 4.0 (May 2021)<br />
                  <strong>Bachelor of Science in Computer Science, Minor in Sustainability</strong>
                  <br />The George Washington University, GPA: 3.7 (May 2020)
                </p>
                <p>
                  <strong>Certifications:</strong> SCRUM Master Certified, Sustainability Minor
                </p>
                <p>
                  <strong>Community:</strong> Volunteer 3-5 hours per week at local recycling center, saving 50+ lbs. from the dump every day.
                </p>
                <p>
                  <strong>Creativity:</strong> Film photography, creative writing (novel and script), designing and selling clothes online and in person, cooking.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Timeline (Desktop Only) */}
      <div className="resume__section resume__section--timeline resume__section--compressed resume__desktop-only">
        <h2 className="resume__timeline-header--compressed">Experience Timeline</h2>
        <div className="resume__timeline-horizontal-wrapper">
          {/* Timeline years */}
          <div className="resume__timeline-years-horizontal">
            {timelineYears.map((year, i) => (
              <div
                className="resume__timeline-year-tick"
                key={year}
                style={{
                  left: `${((year - minYear) / yearRange) * 100}%`
                }}
              >
                <span className="resume__timeline-year-label">{year}</span>
                <span className="resume__timeline-year-dot" />
              </div>
            ))}
          </div>
          {/* Timeline line */}
          <div className="resume__timeline-horizontal-line" />
          {/* Experience labels */}
          {sortedExperiences.map((exp, idx) => {
            const pos = labelPositions[idx];
            const isAbove = idx % 2 === 0;
            const openIdx = sortedToOriginalIdx[idx];

            // Dynamic vertical offset: label's height + gap
            const labelHeight = labelHeights[idx] || 48; // fallback to 48px if not measured yet
            const gap = 8; // px gap between label and timeline
            const top = isAbove
              ? `calc(50% - ${labelHeight + gap}px)`
              : `calc(50% + ${gap}px)`;

            return (
              <React.Fragment key={exp.title + exp.date}>
                {/* Plus/minus button always on the timeline */}
                <button
                  className="resume__toggle-btn resume__toggle-btn--compressed resume__timeline-toggle-btn-fixed"
                  aria-label="Toggle Experience"
                  type="button"
                  tabIndex={0}
                  style={{
                    position: "absolute",
                    left: `${pos}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    toggleExperience(idx);
                  }}
                >
                  {openExperiences[openIdx] ? '−' : '+'}
                </button>
                {/* Label above or below */}
                <div
                  className={`resume__timeline-horizontal-label ${isAbove ? "above" : "below"}`}
                  ref={el => (labelRefs.current[idx] = el)}
                  style={{
                    left: `${pos}%`,
                    top,
                    position: "absolute",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    pointerEvents: "auto"
                  }}
                >
                  <div
                    className="resume__collapsible-header resume__collapsible-header--compressed"
                    style={{
                      marginBottom: isAbove ? "0" : undefined,
                      marginTop: !isAbove ? "0" : undefined,
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative"
                    }}
                  >
                    {/* Only show job title on timeline */}
                    <span className="resume__timeline-title resume__timeline-title--compressed">{exp.jobTitle}</span>
                  </div>
                </div>
                {/* Expanded content rendered absolutely below the label, spanning full width */}
                {openExperiences[openIdx] && (
                  <div
                    className="resume__timeline-content resume__timeline-content--compressed resume__timeline-content--overlay"
                    style={{
                      position: "absolute",
                      left: `${pos}%`,
                      transform: "translateX(-50%)",
                      // Place popup on the opposite side of the timeline from the label
                      top: isAbove
                        ? `calc(50% + ${labelHeight / 2 + gap + 8}px)` // label is above, content below
                        : `calc(50% - ${labelHeight / 2 + gap + 8}px - 100%)`, // label is below, content above
                      zIndex: 100,
                      minWidth: "260px",
                      maxWidth: "420px",
                      width: "max-content",
                      pointerEvents: "auto",
                      background: "var(--resume-bg, #fff)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
                      borderRadius: "8px",
                      padding: "24px 32px",
                      margin: "0 auto"
                    }}
                  >
                    <button
                      className="resume__timeline-close-btn"
                      aria-label="Close Experience"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "transparent",
                        border: "none",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        zIndex: 101
                      }}
                      onClick={() => toggleExperience(idx)}
                    >
                      ×
                    </button>
                    {/* Job Title and Company (company below, not bold, smaller font) */}
                    <div className="resume__timeline-jobtitle-company" style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 0 }}>
                      {exp.jobTitle}
                    </div>
                    <div className="resume__timeline-company" style={{ fontWeight: 400, fontSize: '0.95rem', color: '#444', marginBottom: 4 }}>
                      {exp.company}
                    </div>
                    <div className="resume__timeline-date-compressed">
                      {getStartMonthYear(exp.date)}
                      {getEndMonthYear(exp.date) ? ` – ${getEndMonthYear(exp.date)}` : ""}
                    </div>
                    <div className="resume__timeline-desc resume__timeline-desc--compressed">{exp.description}</div>
                    {exp.details && (
                      <div className="resume__timeline-details resume__timeline-details--compressed">
                        {exp.details.map((d, i) => (
                          <span className="skill-tag" key={i}>{d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Vertical List (Mobile Only) */}
      <div className="resume__section resume__section--mobile-list">
        <h2 className="resume__timeline-header--compressed">Experience</h2>
        <div className="resume__mobile-list-container">
          {experiences.map((exp, originalIdx) => {
            // Find the sorted index if we need to sync state, but for mobile we can just use the original index directly
            // since openExperiences is indexed by original index.
            // We need to find the `sortedIdx` that maps to `originalIdx` to toggle correctly if we reused `toggleExperience(sortedIdx)`.
            // But `toggleExperience` takes `idx` (index in sortedExperiences) and converts it.
            // Let's make a direct toggle helper or find the sorted index.
            const sortedIdx = sortedExperiences.findIndex(s => s === exp);

            return (
              <div key={originalIdx} className="resume__mobile-card">
                <div
                  className="resume__mobile-card-header"
                  onClick={() => toggleExperience(sortedIdx)}
                >
                  <div className="resume__mobile-card-title-group">
                    <span className="resume__mobile-jobtitle">{exp.jobTitle}</span>
                    <span className="resume__mobile-company">{exp.company}</span>
                    <span className="resume__mobile-date">{exp.date}</span>
                  </div>
                  <button className="resume__toggle-btn resume__toggle-btn--compressed">
                    {openExperiences[originalIdx] ? '−' : '+'}
                  </button>
                </div>

                {openExperiences[originalIdx] && (
                  <div className="resume__mobile-card-content">
                    <div className="resume__timeline-desc resume__timeline-desc--compressed">{exp.description}</div>
                    {exp.details && (
                      <div className="resume__timeline-details resume__timeline-details--compressed">
                        {exp.details.map((d, i) => (
                          <span className="skill-tag" key={i}>{d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resume;

