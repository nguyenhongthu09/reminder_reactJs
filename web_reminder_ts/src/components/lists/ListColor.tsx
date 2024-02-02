import React, { useState, useContext } from "react";
import { ListContext } from "../../context/listNote.context";
import { IColor } from "../../types/color.type";
interface IColorProps {
  onColorClick: (color: string) => void;
}

const ListColor: React.FC<IColorProps> = ({ onColorClick }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const context = useContext(ListContext);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorClick(color);
  };

  return (
    <>
      {context.colors.map((color: IColor, index: number) => (
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
