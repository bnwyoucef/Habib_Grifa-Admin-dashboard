import React from "react";
import "./loading.css";

function index() {
  return (
    <div className="loading-container">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default index;
