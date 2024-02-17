import React, { useState, useContext } from "react";
import { ListContext } from "../../context/listNote.context";
import { IColor } from "../../types/color.type";
import { getColors } from "../../store/redux/actions/listNote.action";
import { connect } from "react-redux";
interface IColorProps {
  onColorClick: (color: string) => void;
  colors : IColor[];
  getColors : () => Promise<void>;
}

const ListColor: React.FC<IColorProps> = ({ onColorClick,colors,getColors }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // const context = useContext(ListContext);
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorClick(color);
  };

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

export default connect (mapStateToProps, mapDispathToProps) (ListColor);
