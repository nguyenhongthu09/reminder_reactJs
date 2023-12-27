import React, { Component } from "react";
import "../style/style.css";
class RenderColorOnUi extends Component {
  constructor() {
    super();
    this.state = {
      color: [],
      
    };
  }
  handleColorClick = (selectedColor) => {
    this.props.onColorClick(selectedColor);
  };
  
  render() {
    const { color } = this.props;
    return (
      <>
        {color.map((colors, index) => (
          <div
            key={index}
            className="color-swatch"
            style={{ backgroundColor: colors }}
            onClick={() => this.handleColorClick(colors)}
          ></div>
        ))}
      </>
    );
  }
}
export default RenderColorOnUi;
