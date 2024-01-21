import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

function ListColor({ colors, onColorClick }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
   
    setSelectedColor(color);
    onColorClick(color);
    console.log("re-render");
  };
console.log("list color");
  return (
    <>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-swatch ${
            selectedColor === color ? "selected" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </>
  );
}

ListColor.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  onColorClick: PropTypes.func,
};

export default React.memo(ListColor);
