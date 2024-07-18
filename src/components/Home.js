// Home.js
import React from 'react';
import ImageGallery from 'react-image-gallery';
import './Home.css'; // Import your CSS file for styling

const images = [
  {
    original: '/images/img_bg_2.jpg',
    thumbnail: '/images/img_bg_2.jpg',
    description: 'Image 2'
  },
  {
    original: '/images/img_bg_3.jpg',
    thumbnail: '/images/img_bg_3.jpg',
    description: 'Image 3'
  },
  {
    original: '/images/img_bg_2.jpg',
    thumbnail: '/images/img_bg_2.jpg',
    description: 'Image 2'
  }
];

const Home = () => {
  const handleDownload = () => {
    // Replace 'resume.pdf' with the path to your actual resume file
    const resumePath = '/Kyle_Rood_Resume_2024_Freelance.pdf';
    window.open(resumePath, '_blank');
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1>Hi, I'm Kyle Rood</h1>
        <p className="home__tagline">Freelance AI Software Developer / Engineering Manager.</p>
        <div className="home__contact">
          <p>Email: kylerood16@gmail.com</p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/kyle-rood/" target="_blank" rel="noopener noreferrer">Kyle Rood</a></p>
          <button className="home__download-btn" onClick={handleDownload}>Download Resume</button>
        </div>
      </header>
    </div>
  );
};

export default Home;
