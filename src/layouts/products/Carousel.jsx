import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const handleDragStart = (e) => e.preventDefault();
const renderNextButton = () => <ArrowForwardIosIcon  style={{cursor:"pointer",position: "absolute", right:'-10px', top: '40%',color:'gray',margin:"0" }} fontSize="large"/>

const renderPrevButton = () => <ArrowBackIosIcon style={{ cursor:"pointer",position: "absolute", left: 0, top: '40%', color:'gray' }} fontSize="large"/>

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
  return <AliceCarousel mouseTracking items={items} controlsStrategy="default,alternate" infinite disableDotsControls
  renderPrevButton={renderPrevButton}
  renderNextButton={renderNextButton} />;
}
