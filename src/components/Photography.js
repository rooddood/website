// Photography.jsx
import React, { useEffect, useRef } from 'react';
import './Photography.css';

const Photography = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create and append the external script
    const externalScript = document.createElement('script');
    externalScript.src = 'https://www.redbubble.com/assets/external_portfolio.js';
    externalScript.async = true;

    // Function to run the Redbubble portfolio script
    const initializePortfolio = () => {
      const portfolioScript = document.createElement('script');
      portfolioScript.id = 'rb-xzfcxvzx';
      portfolioScript.type = 'text/javascript';
      portfolioScript.innerHTML = `new RBExternalPortfolio('www.redbubble.com', 'krood16', 2, 2).renderIframe();`;
      containerRef.current.appendChild(portfolioScript);
    };

    // Run the initialize function once the external script is loaded
    externalScript.onload = initializePortfolio;

    // Append the external script to the container
    if (containerRef.current) {
      containerRef.current.appendChild(externalScript);
    }

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="photography">
      <h1>Photography</h1>
      
      {/* Embed Redbubble Portfolio */}
      <div id="rb-embed-container" className="embed-container" ref={containerRef}></div>
    </div>
  );
};

export default Photography;
