import React from 'react';
import './LitVids.css';

const LitVids = () => {
  // Manually add your video URLs here
  const videos = [
    {
      title: "Tidy Diffing",
      url: "https://www.youtube.com/embed/MKizX9EumBI?si=t0enmftb4LyPet8R", //embed url
    },
  ];

  return (
    <div className="lit-vids">
      <h1 className="lit-title">Lit Vids 🔥</h1>
      <h2>Brought to you by</h2>
      <div className="clip-art">
        {/* Corrected paths for clip art */}
        <img src="./images/fieri-sick.PNG" alt="Guy" className="clip" />
        <img src="./images/travis-fish.jpg" alt="Travis Spot" className="clip" />
      </div>

      <div className="video-gallery">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h2>{video.title}</h2>
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-frame"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LitVids;
