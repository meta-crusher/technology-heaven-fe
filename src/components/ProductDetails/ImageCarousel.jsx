import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  // Settings for the main image slider
  const mainSliderSettings = {
    arrows: false, // Hide arrows for the main slider
    fade: true,    // Enable fade transition
    asNavFor: thumbnailSliderRef.current, // Sync with the thumbnail slider
  };

  // Settings for the thumbnail slider
  const thumbnailSliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    asNavFor: mainSliderRef.current, // Sync with the main slider
    arrows: true, // Show arrows on the thumbnail slider
    swipeToSlide: true,
  };

  return (
    <div className="carousel-container">
      {/* Main Image Slider */}
      <Slider
        {...mainSliderSettings}
        ref={mainSliderRef}
        className="main-slider"
        afterChange={(index) => setSelectedImage(images[index])} // Update selected image on change
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Main Image ${index}`} className="main-image" />
          </div>
        ))}
      </Slider>

      {/* Thumbnail Slider */}
      <Slider {...thumbnailSliderSettings} ref={thumbnailSliderRef} className="thumbnail-slider">
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${selectedImage === image ? 'active-thumbnail' : ''}`}
              style={{ width: '80px', height: 'auto', cursor: 'pointer' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
