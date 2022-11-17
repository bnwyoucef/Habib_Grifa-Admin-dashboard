import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

export default function Gallery({ product }) {
  const items = product?.images
    ?.slice(0, -1)
    .split(",")
    .map((imageName) => (
      <div style={{display:'flex',justifyContent: 'center'}}>
        <img
          style={{ backgroundColor: "#e8e7e3",objectFit:"fill"}}
          width="90%"
          height="300px"
          src={`http://localhost:1811/product/image/${imageName}`}
          alt={product.name}
          onDragStart={handleDragStart}
          role="presentation"
        />

      </div>
    ));
  return <AliceCarousel mouseTracking items={items} loop infinite disableDotsControls/>
}
