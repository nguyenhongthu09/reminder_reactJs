import React, { useState , useContext } from "react";
import PropTypes from "prop-types";
import { ListContext } from "../../context/ListContext";
function ListColor({  onColorClick }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const context = useContext(ListContext)
  const handleColorClick = (color) => {
    setSelectedColor(color);
    onColorClick(color);
  };

  return (
    <>
      {context.colors.map((color, index) => (
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
