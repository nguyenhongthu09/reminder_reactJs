import React, { Component } from "react";
class Loading extends Component {
  render() {
    return (
      <>
        <div>
         <div className="overlay"></div>
          <div className="loader__common ">
            <div className="loader"></div>
          </div>
         </div>
      </>
    );
  }
}
export default Loading;
