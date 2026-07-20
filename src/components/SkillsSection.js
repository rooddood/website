import React, { useState } from "react";
import "./SkillsSection.css";

const allSkills = [
  "Python", "React", "Next.JS", "Angular", "HTML/CSS", "Java", "Unity", "Unreal Engine",
  "Multi-Agent Orchestration", "MCP", "pydantic-AI", "Prompt Engineering", "RAG Systems", "LLM fine tuning",
  "Gemini", "Anthropic Claude", "GPT", "HuggingFace", "LangChain",
  "Natural Language Processing (NLP)", "Computer Vision", "Sentiment + Topic Modeling",
  "BERT", "Whisper", "DeepSeek",
  "ETL Pipelines", "Vector Databases", "NoSQL (MongoDB)", "data ingestion",
  "Git/GitHub", "CI/CD", "Docker", "AWS", "GCP",
  "Film Photography", "Creative Writing", "Script Writing", "Video Production", "Novel Writing", "Fashion Design"
];

// Skills to permanently emphasize
const emphasizedSkills = ["Creative Writing", "Script Writing", "Video Production", "Novel Writing", "Fashion Design", "Film Photography", "Python", "React", "AI Agents"];

// Helper to deterministically assign a size class based on string length and index
const getSizeClass = (skill, index) => {
  if (emphasizedSkills.includes(skill)) return "skills-cloud__tag--large";
  const hash = skill.length + index;
  if (hash % 5 === 0) return "skills-cloud__tag--large";
  if (hash % 3 === 0) return "skills-cloud__tag--medium";
  return "skills-cloud__tag--small";
};

const SkillsSection = ({ defaultExpanded = false, blue = false }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Button that triggers the modal */}
      <button 
        className="skills-trigger-btn"
        onClick={() => setShowModal(true)}
      >
        Skills
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="skills-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="skills-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="skills-modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>My Skills</h2>
            <div className="skills-cloud-container">
              {allSkills.map((skill, index) => (
                <span 
                  key={skill} 
                  className={`skills-cloud__tag ${getSizeClass(skill, index)}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SkillsSection;
