import React, { useState } from "react";
import "./Meme.css";

// Dynamically import images from folder
const getImages = () => {
  const context = require.context(
    "../../public/images/memesgoods",
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
        {/* Bio and Title Section */}
        <div className="bio-title-bubble">
          <div className="bio-text">
            <h1>Welcome to MemeMadeGoods!</h1>
            <p>Discover the unique works of Meme (Louise Paolella)!</p>
            <p>
              The Quilting Queen transforms tired items with beautiful fabric
              and expert technique. Check out her amazing works below, including
              the famous thread painting that everyone's talking about!
            </p>
            <a
              href="https://mememadegoods.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="etsy-link"
            >
              Visit Meme's Etsy Shop
            </a>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/images/meme-profile-pic.jpeg`}
            alt="Meme"
            className="meme-photo"
          />
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
      </div>
    );
  }
}

export default Meme;
