import React, { useEffect, useRef } from 'react';
import './Photography.css';
import ImageWithCaption from './ImageWithCaption';

const Photography = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to run the Redbubble portfolio script
    const initializePortfolio = () => {
      if (!document.getElementById('rb-xzfcxvzx')) {
        const portfolioScript = document.createElement('script');
        portfolioScript.id = 'rb-xzfcxvzx';
        portfolioScript.type = 'text/javascript';
        portfolioScript.innerHTML = `new RBExternalPortfolio('www.redbubble.com', 'krood16', 1, 5).renderIframe();`;
        containerRef.current.appendChild(portfolioScript);
      }
    };

    // Create and append the external script
    const externalScript = document.createElement('script');
    externalScript.src = 'https://www.redbubble.com/assets/external_portfolio.js';
    externalScript.async = true;
    externalScript.onload = initializePortfolio;

    // Append the external script to the container
    if (containerRef.current && !containerRef.current.firstChild) {
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

      {/* Custom Image with Caption */}
      <div className="gallery-container">
        <ImageWithCaption
          src="/images/img_bg_2.jpg"  // Replace with your actual image path
          alt="Sample Image"
          caption="This is a sample caption for the image."
        />
      </div>

      {/* Embed Redbubble Portfolio */}
      <div className="embed-container">
        <div id="rb-embed-container" ref={containerRef}></div>
      </div>
    </div>
  );
};

export default Photography;
