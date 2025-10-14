import React, { useState, useRef, useLayoutEffect } from "react";
import "./Resume.css";

const experiences = [
  // Newest roles (2024-2025)
  {
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
    title: "Lead Machine Learning Researcher - The George Washington University",
    date: "Dec. 2017 - May 2021",
    description: "Performed water depth estimation of flooded cities using overhead multiband satellite imagery. Helped DZYNE Technologies with an ongoing DARPA project aiming to to assist in response to natural disasters by routing first responders to accessible roads/routes. Developed FE and BE of Archive of Many Outdoor Scenes (AMOS), a website to collect, categorize, and display images from free webcams posted around the world. Eventually collected a database of over 3,000 cameras and over 1 billion images from these cameras.",
    details: [
      "Python, AWS, Computer Vision, Big Data + Databases"
    ]
  },
  {
    title: "Software Engineering Intern - Navteca",
    date: "May 2020 - Sep. 2020",
    description: "Built Unity based extraction of geographical metadata from Geotiff files. This was used to determine precise spatial information for Virtual Reality visualizations of floods and other natural disasters. Built out AWS Lambda internal scheduling system.",
    details: [
      "Angular, AWS (Lambda, EC2), Unity"
    ]
  },
  {
    title: "Software Engineering Intern - LinkedSenior",
    date: "Feb. 2020 - May 2020",
    description: "Full Stack development of a resident engagement platform for nursing homes. Fixing and building memory games and social activities for residents with dementia.",
    details: [
      "React, Java Spring"
    ]
  },
  {
    title: "Software Engineering Intern - DZYNE Technologies",
    date: "May 2019 - Sep. 2019",
    description: "Assembled cloud based testing and integration for Machine Learning and Computer Vision models in a greenfield environment. Used as part of an ongoing DARPA project involving disaster relief assessment.",
    details: [
      "Python, Docker, AWS (Lambda, EC2), Computer Vision"
    ]
  },
  // Legacy/other roles (compressed)
  {
    title: "Research Assistant - The George Washington University",
    date: "2017 - 2018",
    description: "Developed the AMOSeast website and used machine learning for image classification."
  },
  {
    title: "Sales Floor Team Member - Target",
    date: "June 2017 - Aug 2017",
    description: "Retail experience."
  },
  {
    title: "Technical Sales Associate - The Mac Express",
    date: "Jan 2016 - Aug 2016",
    description: "Technical sales and customer support."
  }
];

// Expanded skills summary
const skills = [
  "Python", "React", "Next.JS", "Angular", "HTML/CSS", "Java", "Unity", "Unreal Engine",
  "Multi-Agent Orchestration (MCP/pydantic-AI)", "Prompt Engineering", "RAG Systems", "LLM fine tuning",
  "Gemini", "Anthropic Claude", "GPT", "HuggingFace",
  "NLP", "Computer Vision", "Model Fine-Tuning", "Sentiment + Topic Modeling",
  "BERT", "Whisper", "DeepSeek",
  "ETL Pipelines", "Vector Databases (DocumentDB)", "NoSQL (MongoDB)", "data ingestion/scraping",
  "Git/GitHub Workflows (CI/CD)", "Docker", "AWS (Lambda, EC2, CodePipeline, etc.)", "GCP",
  "SCRUM Master Certified", "Sustainability Minor",
  "Film Photography", "Creative writing", "Cooking", "Clothing design/sales", "Community Volunteering"
];

// Add a structured skills summary for sections
const skillsSections = [
  {
    label: "Languages & Technologies",
    items: [
      "Python", "React", "Next.JS", "Angular", "HTML/CSS", "Java", "Unity", "Unreal Engine"
    ]
  },
  {
    label: "GenAI & Agents",
    items: [
      "Multi-Agent Orchestration (MCP/pydantic-AI)", "Prompt Engineering", "RAG Systems", "LLM fine tuning"
    ]
  },
  {
    label: "Large Language Models (LLMs)",
    items: [
      "Gemini", "Anthropic Claude", "GPT", "HuggingFace", "LangChain"
    ]
  },
  {
    label: "Core ML/AI",
    items: [
      "Natural Language Processing (NLP)", "Computer Vision", "Model Fine-Tuning", "Sentiment + Topic Modeling"
    ]
  },
  {
    label: "AI Models",
    items: [
      "BERT", "Whisper", "DeepSeek"
    ]
  },
  {
    label: "Data & Databases",
    items: [
      "ETL Pipelines", "Vector Databases (DocumentDB)", "NoSQL (MongoDB)", "data ingestion/scraping"
    ]
  },
  {
    label: "Cloud & DevOps",
    items: [
      "Git/GitHub Workflows (CI/CD)", "Docker", "AWS (Lambda, EC2, CodePipeline, etc.)", "GCP"
    ]
  },
  {
    label: "Certifications",
    items: [
      "Sustainability Minor", "SCRUM Master Certified"
    ]
  },
  {
    label: "Creativity",
    items: [
      "Film Photography", "Creative writing (novel and script)"
    ]
  },
  {
    label: "Solving Problems",
    items: [
      "Designing + implementing recipes (cooking)", "Making + selling clothes online + in person"
    ]
  },
  {
    label: "Community",
    items: [
      "Volunteer 3-5 hours per week at local recycling center, saving 50+ lbs. from the dump every day"
    ]
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
  const [showSkills, setShowSkills] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [openExperiences, setOpenExperiences] = useState(
    Array(experiences.length).fill(false)
  );

  // Map sorted index to original index for correct toggle
  const sortedToOriginalIdx = sortedExperiences.map(exp =>
    experiences.findIndex(e => e.title === exp.title && e.date === exp.date)
  );

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
      {/* Skills and About Me at the Top, side by side, collapsible */}
      <div className="resume__section resume__section--top resume__section--compressed">
        <div className="resume__skills-block resume__collapsible resume__compressed-block">
          <div className="resume__collapsible-header" onClick={() => setShowSkills((v) => !v)}>
            <h2>Skills</h2>
            <button className="resume__toggle-btn" aria-label="Toggle Skills">{showSkills ? '−' : '+'}</button>
          </div>
          {showSkills && (
            <div className="resume__skills resume__skills--sections">
              {skillsSections.map(section => (
                <div className="resume__skills-section" key={section.label}>
                  <div className="resume__skills-section-label">{section.label}:</div>
                  <div className="resume__skills-section-items">
                    {section.items.map(item => (
                      <span className="skill-tag" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="resume__about-block resume__collapsible resume__compressed-block">
          <div className="resume__collapsible-header" onClick={() => setShowAbout((v) => !v)}>
            <h2>About Me & Education</h2>
            <button className="resume__toggle-btn" aria-label="Toggle About Me">{showAbout ? '−' : '+'}</button>
          </div>
          {showAbout && (
            <div className="resume__content resume__content--compressed">
              <p>
                <strong>Education:</strong><br />
                <strong>Masters in Computer Science, Concentration in Artificial Intelligence</strong>
                <br />The George Washington University, GPA: 4.0 (May 2021)<br />
                <strong>Bachelor of Science in Computer Science, Minor in Sustainability</strong>
                <br />The George Washington University, GPA: 3.7 (May 2020)<br /><br />
                <strong>Certifications:</strong> SCRUM Master Certified, Sustainability Minor
              </p>
              <p>
                Full stack implementation engineer and AI developer with a proven record of architecting advanced data visualization tools, scalable ETL pipelines, and custom NLP/AI solutions for clients and research teams.
              </p>
              <p>
                Experienced in leading engineering teams, mentoring, and establishing Agile practices. Passionate about leveraging AI, cloud, and data science to solve real-world problems and deliver actionable insights.
              </p>
              <p>
                Strong communicator and educator, with a background in teaching Python, data science, and empowering non-CS students to apply programming to real-world datasets.
              </p>
              <p>
                <strong>Community:</strong> Volunteer 3-5 hours per week at local recycling center, saving 50+ lbs. from the dump every day.
              </p>
              <p>
                <strong>Creativity:</strong> Film photography, creative writing (novel and script), designing and selling clothes online and in person, cooking.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div className="resume__section resume__section--timeline resume__section--compressed">
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
                    {/* Title */}
                    <span className="resume__timeline-title resume__timeline-title--compressed">{exp.title}</span>
                  </div>
                </div>
                {/* Expanded content rendered absolutely below the label, spanning full width */}
                {openExperiences[openIdx] && (
                  <div
                    className="resume__timeline-content resume__timeline-content--compressed resume__timeline-content--overlay"
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      // Place directly below the label (use labelHeight + gap)
                      top: `calc(50% + ${labelHeight / 2 + gap + 8}px)`,
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
    </div>
  );
};

export default Resume;

