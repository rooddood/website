import React, { useState } from "react";
import "./Meme.css";

// Dynamically import images from folder
const getImages = () => {
  const context = require.context(
    "../../public/images/mememade",
    false,
    /\.(jpg|jpeg|png)$/
  );
  return context.keys().map(context);
};

class Meme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  goToPrevious = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === 0
          ? this.images.length - 1
          : prevState.currentIndex - 1,
    }));
  };

  goToNext = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === this.images.length - 1
          ? 0
          : prevState.currentIndex + 1,
    }));
  };

  images = getImages();

  render() {
    const { currentIndex } = this.state;
    return (
      <div className="meme">
        {/* Title Bubble */}
        <div className="title-bubble">
          <h1>Welcome to MemeMadeGoods!</h1>
          <p>Discover the unique works of Meme (Louise Paolella). Visit her Etsy shop for more!</p>
          <a href="https://mememadegoods.etsy.com" target="_blank" rel="noopener noreferrer" className="etsy-link">
            Visit Meme's Etsy Shop
          </a>
        </div>

        {/* Scrolling Display */}
        <div className="carousel">
          <button className="nav-button prev" onClick={this.goToPrevious}>
            &#10094;
          </button>
          <div
            className="slide"
            style={{
              backgroundImage: `url(${this.images[currentIndex]})`,
            }}
          ></div>
          <button className="nav-button next" onClick={this.goToNext}>
            &#10095;
          </button>
        </div>

        {/* Bio Section */}
        <div className="bio-bubble">
          <img
            src={`${process.env.PUBLIC_URL}/images/meme-profile-pic.jpeg`}
            alt="Meme"
            className="meme-photo"
          />
          <div className="bio-text">
            <p>Louise Paolella (AKA Meme) is a talented artisan with a passion for [her craft]. Each piece she creates is filled with love and attention to detail. Learn more about her journey and inspiration through her works.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Meme;
