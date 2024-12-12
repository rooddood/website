import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import './Shops.css';

const Shops = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const initializePortfolio = () => {
      if (!document.getElementById('rb-xzfcxvzx')) {
        const portfolioScript = document.createElement('script');
        portfolioScript.id = 'rb-xzfcxvzx';
        portfolioScript.type = 'text/javascript';
        portfolioScript.innerHTML = `new RBExternalPortfolio('www.redbubble.com', 'krood16', 1, 5).renderIframe();`;
        containerRef.current.appendChild(portfolioScript);
      }
    };

    const externalScript = document.createElement('script');
    externalScript.src = 'https://www.redbubble.com/assets/external_portfolio.js';
    externalScript.async = true;
    externalScript.onload = initializePortfolio;

    if (containerRef.current && !containerRef.current.firstChild) {
      containerRef.current.appendChild(externalScript);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="shops">
      <h1>Shops</h1>

      {/* Redbubble Section */}
      <div className="redbubble-section">
        <h2>Redbubble</h2>
        <p>This is my online shop where you can find prints and other merchandise.</p>
        <div className="embed-container">
          <div id="rb-embed-container" ref={containerRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Shops;