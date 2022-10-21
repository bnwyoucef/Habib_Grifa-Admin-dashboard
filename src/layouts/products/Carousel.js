import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

export default function Gallery({ product }) {
  const items = product?.images
    ?.slice(0, -1)
    .split(",")
    .map((imageName) => (
      <img
        style={{ backgroundColor: "#e8e7e3" }}
        width="400px"
        height="400px"
        src={`http://localhost:1811/product/image/${imageName}`}
        alt={product.name}
        onDragStart={handleDragStart}
        role="presentation"
      />
    ));
  return <AliceCarousel mouseTracking items={items} />;
}
