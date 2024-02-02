import React, { useState, useContext } from "react";

import { ListContext } from "../../context/listNote.context";

interface Props {
  onColorClick: (color: string) => void;
}

const ListColor: React.FC<Props> = ({ onColorClick }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const context = useContext(ListContext);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorClick(color);
  };

  return (
    <>
      {context.colors.map((color, index) => (
        <div
          key={index}
          className={`color-swatch ${
            selectedColor === color.color ? "selected" : ""
          }`}
          style={{ backgroundColor: color.color }}
          onClick={() => handleColorClick(color.color)}
        ></div>
      ))}
    </>
  );
};

export default React.memo(ListColor);
