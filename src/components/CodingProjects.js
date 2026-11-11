import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CodingProjects.css';
import './TagBubble.css';

const CLIENT_WORK = [
  {
    id: 'nodus',
    title: 'Nodus',
    url: 'https://www.nodus.io/',
    logo: `${process.env.PUBLIC_URL}/images/nodus-logo.png`,
    tags: ['Python', 'AI Agents'],
    summary: 'AI agent architecture & Pydantic-AI MCP server on Docker/Next.JS.',
    details: (
      <>
        <p>Advised on AI agent workflows and implemented a Python (Pydantic-AI) MCP server to source live web data, integrated into a Dockerized Next.JS stack.</p>
        <a href="https://www.nodus.io/" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          Visit Nodus &#8599;
        </a>
      </>
    )
  },
  {
    id: 'hilltop',
    title: 'Hilltop-App',
    url: 'https://www.hilltop-app.com/',
    logo: `${process.env.PUBLIC_URL}/images/hilltop-logo.png`,
    tags: ['Next.JS', 'RAG'],
    summary: 'Context-aware AI assistant UI & legislative LangChain RAG pipeline.',
    details: (
      <>
        <p>Rebuilt the Next.JS/Angular assistant interface and engineered RAG pipelines + Python verification harnesses grounding AI responses in legislative data.</p>
        <a href="https://www.hilltop-app.com/" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          Visit Hilltop-App &#8599;
        </a>
      </>
    )
  },
  {
    id: 'ssr',
    title: 'Strategic Solutions Research',
    url: 'https://strategicsolutionsresearch.com/',
    logo: `${process.env.PUBLIC_URL}/images/ssr-logo.png`,
    tags: ['Python', 'React'],
    summary: 'Automated React data visualizations, ETL pipelines & custom BERT NLP.',
    details: (
      <>
        <p>Built React client reporting dashboards, scalable Python ETL pipelines, and custom HuggingFace BERT topic/sentiment models for deeper client insights.</p>
        <a href="https://strategicsolutionsresearch.com/" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          Visit SSR &#8599;
        </a>
      </>
    )
  }
];

const PROJECTS = [
  {
    id: 'dicta',
    title: 'Dicta — AI Writing Assistant',
    tags: ['Python', 'Local LLMs'],
    summary: 'Local AI voice-to-text assistant for formatted script writing.',
    details: (
      <>
        <div className="eng-media-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/voicescribe.png`}
            alt="Dicta logo"
            className="eng-thumb-logo"
          />
        </div>
        <p>Converts voice input into structured, copy-ready scripts using open-source local LLMs and speech recognition—keeping workflows fast and private.</p>
        <a href="https://github.com/rooddood/script-writing-app" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          View on GitHub &#8599;
        </a>
      </>
    )
  },
  {
    id: 'contract',
    title: 'AI Contract Negotiator',
    tags: ['Hugging Face', 'LLMs'],
    summary: 'Automated contract drafting and negotiation powered by LLMs.',
    details: (
      <>
        <p>Generates balanced contractor/hirer agreements from minimal inputs, reducing legal drafting friction for freelancers and small teams while adapting across contract types.</p>
        <a href="https://github.com/rooddood/ai-contract-negotiator/tree/main" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          View on GitHub &#8599;
        </a>
      </>
    )
  },
  {
    id: 'flickpick',
    title: 'FlickPick',
    tags: ['React', 'OpenAI API'],
    summary: 'AI movie & TV recommender tailored to personal taste.',
    details: (
      <>
        <p>Pairs OpenAI recommendations with live movie/TV databases in a fast, interactive interface to solve decision fatigue.</p>
        <div className="eng-video-wrap" onClick={(e) => e.stopPropagation()}>
          <iframe
            src="https://www.youtube.com/embed/aDI4ZdjhDLE"
            title="FlickPick Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <a href="https://github.com/rooddood/flickpick" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          View on GitHub &#8599;
        </a>
      </>
    )
  },
  {
    id: 'ambervision',
    title: 'AmberVision',
    tags: ['YOLO', 'Computer Vision'],
    summary: 'Real-time DC traffic-cam vehicle & color detection for Amber Alerts.',
    details: (
      <>
        <p>GWU senior capstone with Dr. Robert Pless using TrafficLand DC camera feeds, YOLO object detection, and PCA color classification mapped in Vue.js.</p>
        <div className="eng-screenshots">
          <img src={`${process.env.PUBLIC_URL}/images/amber_vision_detection.png`} alt="AmberVision vehicle detection" />
          <img src={`${process.env.PUBLIC_URL}/images/ambervision_webpage.jpg`} alt="AmberVision map dashboard" />
        </div>
        <a href="https://gw-cs-sd.github.io/sd-20-fernandez-rood-shah/" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          Project Page &#8599;
        </a>
      </>
    )
  },
  {
    id: 'artistree',
    title: 'Artistree',
    tags: ['React', 'Music AI'],
    summary: 'Discover new musicians by tracing artist-to-artist influence trees.',
    details: (
      <>
        <p>Maps inspiration lineages across artists so listeners can trace where musical styles and sounds originated and uncover overlooked favorites.</p>
      </>
    )
  },
  {
    id: 'amos',
    title: 'AMOS: Outdoor Scenes Archive',
    tags: ['Flask', 'OpenCV'],
    summary: 'Time-lapse dataset archiving 1B+ images from 7,000+ public webcams.',
    details: (
      <>
        <p>Built full-stack infrastructure (Python Flask, OpenCV, PostgreSQL) at GWU to collect and study long-term environmental and urban imagery globally.</p>
        <a href="https://github.com/GWUvision/AMOSEast" target="_blank" rel="noopener noreferrer" className="eng-inline-link" onClick={(e) => e.stopPropagation()}>
          View on GitHub &#8599;
        </a>
      </>
    )
  }
];

const CodingProjects = () => {
  const navigate = useNavigate();
  const holdTimerRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  const startSecretHold = (targetPath) => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      navigate(targetPath);
    }, 3000);
  };

  const cancelSecretHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  const toggleCard = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="eng-page">
      <div className="eng-inner">
        <header className="eng-header">
          <h1>Software Engineering</h1>
          <p className="eng-subtitle">Full Stack AI Engineer &bull; Remote / Washington D.C.</p>
          <div className="eng-actions">
            <a href="https://github.com/rooddood" target="_blank" rel="noopener noreferrer" className="eng-action-pill">
              GitHub
            </a>
            <a href={`${process.env.PUBLIC_URL}/Kyle_Rood_Resume_Whole_2026.pdf`} target="_blank" rel="noopener noreferrer" className="eng-action-pill eng-action-pill--primary">
              Resume PDF
            </a>
            <a href="https://www.upwork.com/freelancers/~013ea7305f186f0b3d?mp_source=share" target="_blank" rel="noopener noreferrer" className="eng-action-pill">
              Upwork
            </a>
            <a href="https://www.fiverr.com/s/WE3pj2B" target="_blank" rel="noopener noreferrer" className="eng-action-pill">
              Fiverr
            </a>
            <a href="mailto:kylerood16@gmail.com" className="eng-action-pill">
              Email
            </a>
          </div>
        </header>

        <section className="eng-section">
          <h2 className="eng-section-title">Client &amp; Freelance Work</h2>
          <div className="eng-clients-grid">
            {CLIENT_WORK.map((client) => {
              const isOpen = expandedId === client.id;
              return (
                <div
                  key={client.id}
                  className={`eng-card eng-card--client${isOpen ? ' is-open' : ''}`}
                  onClick={() => toggleCard(client.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(client.id);
                    }
                  }}
                >
                  <div className="eng-card-top">
                    <div className="eng-client-brand">
                      <img src={client.logo} alt={`${client.title} logo`} className="eng-client-logo" />
                      <h3>{client.title}</h3>
                    </div>
                    <span className={`eng-chevron${isOpen ? ' rotated' : ''}`}>&#9662;</span>
                  </div>
                  <p className="eng-card-summary">{client.summary}</p>
                  <div className="eng-tags">
                    {client.tags.map((tag) => (
                      <span key={tag} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                  {isOpen && <div className="eng-card-details">{client.details}</div>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="eng-section">
          <h2 className="eng-section-title">Featured Projects</h2>
          <div className="eng-projects-grid">
            {PROJECTS.map((project) => {
              const isOpen = expandedId === project.id;
              return (
                <div
                  key={project.id}
                  className={`eng-card${isOpen ? ' is-open' : ''}`}
                  onClick={() => toggleCard(project.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(project.id);
                    }
                  }}
                >
                  <div className="eng-card-top">
                    <h3>{project.title}</h3>
                    <div className="eng-card-right">
                      <div className="eng-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="skill-tag">{tag}</span>
                        ))}
                      </div>
                      <span className={`eng-chevron${isOpen ? ' rotated' : ''}`}>&#9662;</span>
                    </div>
                  </div>
                  <p className="eng-card-summary">{project.summary}</p>
                  {isOpen && <div className="eng-card-details">{project.details}</div>}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Completely Invisible 3-Second Hold Secret Corners (Left = Arcade, Right = LitVids) */}
      <div
        className="secret-corner-trigger secret-corner-left"
        onMouseDown={() => startSecretHold('/arcade')}
        onMouseUp={cancelSecretHold}
        onMouseLeave={cancelSecretHold}
        onTouchStart={() => startSecretHold('/arcade')}
        onTouchEnd={cancelSecretHold}
        onTouchCancel={cancelSecretHold}
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden="true"
      />
      <div
        className="secret-corner-trigger secret-corner-right"
        onMouseDown={() => startSecretHold('/litvids')}
        onMouseUp={cancelSecretHold}
        onMouseLeave={cancelSecretHold}
        onTouchStart={() => startSecretHold('/litvids')}
        onTouchEnd={cancelSecretHold}
        onTouchCancel={cancelSecretHold}
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden="true"
      />
    </div>
  );
};

export default CodingProjects;
