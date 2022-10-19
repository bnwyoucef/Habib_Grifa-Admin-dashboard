import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src="https://picsum.photos/800/300"
    alt="one"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="https://picsum.photos/800/300"
    alt="two"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="https://picsum.photos/800/300"
    alt="three"
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

export default function Gallery() {
  return <AliceCarousel mouseTracking items={items} />;
}
