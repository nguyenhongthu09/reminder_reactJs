import React, { Component } from "react";
import getAllList from "../../fetchApi/fetchApiList";
class ListComponent extends Component {
  constructor() {
    super();
    this.state = {
      listNote: [],
     
    };
  }

  getListNote = async () => {
    try {
      const listData = await getAllList();
      this.setState({ listNote: listData });
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };

  componentDidMount() {
    console.log("Component did mount");
    this.getListNote();
  }

  render() {
    const { listNote } = this.state;
    return (
      <div>
       {listNote.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
        {console.log(listNote, "log DOM")}
      </div>
    );
  }
}
export default ListComponent;

