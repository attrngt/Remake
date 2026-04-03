import React, { useEffect, useRef, useState } from "react";
import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children, images = [], interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const swipe = useRef({});

  const slides = images.length
    ? images.map((src, index) => (
        <CarouselItem key={index} width="100%">
          <img src={src} alt={`Slide ${index + 1}`} className="carousel-img" />
        </CarouselItem>
      ))
    : React.Children.map(children, (child) =>
        React.cloneElement(child, { width: "100%" }),
      );

  const slideCount = slides ? slides.length : 0;

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = slideCount - 1;
    } else if (newIndex >= slideCount) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  // --- LOGIKA AUTO SCROLL ---
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        updateIndex(activeIndex + 1);
      }, interval);
    }
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, slideCount, interval]);

  // --- LOGIKA MANUAL SWIPE/SCROLL ---
  const handleTouchStart = (e) => {
    setIsPaused(true); // Berhenti auto-scroll pas disentuh
    swipe.current = { x: e.touches[0].clientX };
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - swipe.current.x;
    if (Math.abs(deltaX) > 50) {
      updateIndex(deltaX > 0 ? activeIndex - 1 : activeIndex + 1);
    }
    setIsPaused(false); // Lanjut auto-scroll pas lepas sentuhan
  };

  // Untuk Mouse (Laptop/PC)
  const handleMouseDown = (e) => {
    setIsPaused(true);
    swipe.current = { x: e.clientX };
  };

  const handleMouseUp = (e) => {
    if (!swipe.current.x) return;
    const deltaX = e.clientX - swipe.current.x;
    if (Math.abs(deltaX) > 50) {
      updateIndex(deltaX > 0 ? activeIndex - 1 : activeIndex + 1);
    }
    setIsPaused(false);
    swipe.current = {};
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsPaused(true)} // Berhenti pas mouse hover
      onMouseLeave={() => setIsPaused(false)} // Jalan lagi pas mouse pergi
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides}
      </div>

      {/* Titik indikator bawah */}
      <div className="dots">
        {Array.from({ length: slideCount }).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === activeIndex ? "active" : ""}`}
            onClick={() => updateIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
