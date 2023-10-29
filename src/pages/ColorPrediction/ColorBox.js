import React from "react";

const ColorBox = ({ color, selected, onClick }) => {
  const boxStyle = {
    backgroundColor: color,
    margin: "5px",
    border: selected ? "2px solid black" : "",
    width: "100px",
    height: "100px",
    cursor: "pointer",
    opacity: selected ? "1" : "0.95",
    transition: "opacity 0.3s ease",
    boxSizing: "border-box",
  };

  return <div style={boxStyle} onClick={onClick}></div>;
};

export default ColorBox;
