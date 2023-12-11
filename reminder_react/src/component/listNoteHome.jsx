import React , {Component} from "react"
import ParentComponent from "./test"
import AddListForm from "./addListForm"
class  ListNoteRender  extends Component {
    constructor() {
        super();
        this.state = {
          showAddListForm: false,
        };
    
        this.handleAddListClick = this.handleAddListClick.bind(this);
      }
    
      handleAddListClick() {
        this.setState((prevState) => ({
          showAddListForm: !prevState.showAddListForm,
        }));
      }
      render() {
        const { showAddListForm } = this.state;
        return (
          <>
            <div className="menu-list-notes" style={{ display: showAddListForm ? "none" : "block" }}>
            <div className="menu-list-note" id="renderlist-home">
            <ParentComponent></ParentComponent>
            </div>
            <div className="button-home">
              <button
                type="button"
                className="btn btn-primary add-reminder btn__add--reminder"
              >
                New Reminder
              </button>
              <button
                type=" button"
                className="btn btn-primary add-list"
                id="add-list-new"
                onClick={this.handleAddListClick}
              >
                Add List
              </button>
            </div>
          </div>
           <AddListForm showForm={showAddListForm} /> 
          </>
        )
}
}

export default ListNoteRender;