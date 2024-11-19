import React, { useState } from 'react';
import './Writing.css';

const stories = [
  {
    title: "A Walk Through the Forest",
    preview: "A brief encounter with nature...",
    content: "The forest was alive with the sounds of chirping birds and rustling leaves. Every step felt like a journey into another world.",
  },
  {
    title: "The Midnight Train",
    preview: "A mysterious traveler boards...",
    content: "The train cut through the night, its whistle echoing in the darkness. A shadowy figure took the seat across from me, eyes gleaming with secrets.",
  },
  {
    title: "Lost in the Market",
    preview: "Chaos and charm in a foreign bazaar...",
    content: "The market was a whirlwind of colors and sounds. Vendors shouted over each other, and the aroma of spices filled the air.",
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
          Welcome to my collection of free writing! Here, you’ll find an assortment of short stories, musings, and anecdotes that capture my imagination and experiences. Each piece offers a small window into the worlds I love to create. Click on a title to explore the full story.
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
