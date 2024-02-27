import React, { useState, useEffect } from "react";
import { IColor } from "../../types/color.type";
import { getColors } from "../../store/redux/actions/listNote.action";
import { connect } from "react-redux";
interface IColorProps {
  onColorClick: (color: string) => void;
  colors: IColor[];
  getColors: () => Promise<void>;
}

const ListColor: React.FC<IColorProps> = ({
  onColorClick,
  colors,
  getColors,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorClick(color);
  };
  useEffect(() => {
    getColors();
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

const mapStateToProps = (state: any) => {
  return {
    colors: state.listReducer.colors,
  };
};
const mapDispathToProps = (dispatch: any) => {
  return {
    getColors: () => dispatch(getColors()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ListColor);
