import React, { useState } from "react";
import "./SkillsSection.css";

// The skillsSections array is imported or duplicated from Resume.js for now
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


const SkillsSection = ({ defaultExpanded = true, blue = false }) => {
  const [showSkills, setShowSkills] = useState(defaultExpanded);
  const collapsed = blue && !showSkills;
  return (
    <div className={`skills-section__block${blue ? ' skills-section__block--blue' : ''}${collapsed ? ' skills-section__block--collapsed' : ''}`}>
      <div className={`skills-section__header${collapsed ? ' skills-section__header--centered' : ''}`} onClick={() => setShowSkills((v) => !v)}>
        <h2
          className={blue ? 'skills-section__title--blue' : ''}
          style={collapsed ? { margin: 0, fontSize: '1.25em', width: '100%', textAlign: 'center', fontWeight: 600, letterSpacing: '0.5px' } : {}}
        >
          Skills
        </h2>
        <button className={`skills-section__toggle-btn${blue ? ' skills-section__toggle-btn--blue' : ''}`} aria-label="Toggle Skills">{showSkills ? '−' : '+'}</button>
      </div>
      {showSkills && (
        <div className="skills-section__sections-row">
          {skillsSections.map(section => (
            <div className="skills-section__section" key={section.label}>
              <div className={`skills-section__section-label${blue ? ' skills-section__section-label--blue' : ''}`}>{section.label}:</div>
              <div className="skills-section__section-items">
                {section.items.map(item => (
                  <span className={`skills-section__tag${blue ? ' skills-section__tag--blue' : ''}`} key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
