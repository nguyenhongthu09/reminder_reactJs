import React, { useState, useEffect } from "react";
import { IColor } from "../../types/color.type";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux-toolkit/store/store";
import { getColors } from "../../redux-toolkit/action/actionListNote";
interface IColorProps {
  onColorClick: (color: string) => void;
}

const ListColor: React.FC<IColorProps> = ({ onColorClick }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const colors = useSelector((state: RootState) => state.listNote.colors);
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorClick(color);
  };
  useEffect(() => {
    dispatch(getColors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {colors.map((color: IColor, index: number) => (
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

export default ListColor;
