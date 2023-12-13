import React , {Component} from "react";
import getColor from "../fetchApi/fetchColor";
import "../style/style.css"

class RenderColorOnUi extends Component {
    constructor() {
        super();
        this.state = {
            color:[],
           
        }
    };
    getColors = async () =>{
        try {
            const colorData = await getColor();
            this.setState({
                color: colorData.map((colors) => colors.color),
            });
          } catch (error) {
            console.error('Error fetching colorData:', error.message);
          }
    };
   
    componentDidMount = () =>{
        this.getColors();
    };
    render() {
        const {color } = this.state;
        return (
            <>
            {color.map((colors, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: colors }}
                onClick={() => this.props.onColorClick(colors)}
              ></div>
            ))}
          </>
        );
    }
}
export default RenderColorOnUi;