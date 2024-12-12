import React, { useState } from 'react';
import './Writing.css';

const stories = [
  {
    title: "A Walk Through the Forest",
    preview: "A brief encounter with nature...",
    content: "The forest was alive with the sounds of chirping birds and rustling leaves. Every step felt like a journey into another world.",
  },
];

const Writing = () => {
  const [expandedStory, setExpandedStory] = useState(null);

  const toggleStory = (index) => {
    setExpandedStory(expandedStory === index ? null : index);
  };

  return (
    <div className="writing">
      <h1>Free Writing</h1>
      <div className="writing-intro">
        <p>
          Welcome to my portfolio of free writing! Click on a title to explore the full piece.
        </p>
      </div>
      <div className="short-stories">
        {stories.map((story, index) => (
          <div 
            key={index} 
            className={`story-bubble ${expandedStory === index ? 'expanded' : ''}`} 
            onClick={() => toggleStory(index)}
          >
            <h2>{story.title}</h2>
            <p>{expandedStory === index ? story.content : story.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writing;
