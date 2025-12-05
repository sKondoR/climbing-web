import { useState, useEffect } from 'react';

import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg5.jpg'
import bg3 from '../../assets/team.jpg'

const images = [bg1, bg2, bg3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 3 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % images.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform ease-in-out duration-700 h-[48rem]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="min-w-full h-[48rem] bg-cover bg-fixed bg-center bg-no-repeat shadow-lg blur-xs"
            style={{
              backgroundImage: `url("${img}")`
            }}
          >
          </div>
        ))}
      </div>
      {/* Overlay hover:from-pink-500 hover:to-orange-500 */}
      <div className="absolute inset-0 h-2/6 bg-gradient-to-b from-black to-tranparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-teal-400 to-blue-500 opacity-30"></div>
      {/* Controls: Left */}
      <div
        onClick={goToPrev}
        className="absolute text-5xl cursor-pointer left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:text-opacity-70 focus:outline-none"
      >
        &#10094;
      </div>

      {/* Controls: Right */}
      <div
        onClick={goToNext}
        className="absolute text-5xl cursor-pointer right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:text-opacity-70 focus:outline-none"
      >
        &#10095;
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 p-3 rounded-full ${
              idx === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;