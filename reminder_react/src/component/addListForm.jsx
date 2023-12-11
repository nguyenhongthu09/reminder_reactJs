import React , {Component} from "react";
import "../style/style.css";
class AddListForm extends Component {
    render(){
        return (
            <form id="form_add_list" action=""  className={`form-add-list ${this.props.showForm ? 'visible' : 'hidden'}`}>
              <div className="form__add__list">
                <button
                  type="button"
                  id="btn-cancel"
                  className="btn btn-primary button-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="btnSubmit"
                  className="btn btn-primary button-done"
                  disabled
                >
                  Done
                </button>
              </div>
              <h1>New List</h1>
              <div className="form_add_list_name">
                <div className="fill-icon-color" id="icon-color">
                  <span className="fill-color">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 11.5C5 11.2239 5.22386 11 5.5 11H14.5C14.7761 11 15 11.2239 15 11.5C15 11.7761 14.7761 12 14.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 7.5C5 7.22386 5.22386 7 5.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H5.5C5.22386 8 5 7.77614 5 7.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 3.5C5 3.22386 5.22386 3 5.5 3H14.5C14.7761 3 15 3.22386 15 3.5C15 3.77614 14.7761 4 14.5 4H5.5C5.22386 4 5 3.77614 5 3.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 4.5C2.55228 4.5 3 4.05228 3 3.5C3 2.94772 2.55228 2.5 2 2.5C1.44772 2.5 1 2.94772 1 3.5C1 4.05228 1.44772 4.5 2 4.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 8.5C2.55228 8.5 3 8.05228 3 7.5C3 6.94772 2.55228 6.5 2 6.5C1.44772 6.5 1 6.94772 1 7.5C1 8.05228 1.44772 8.5 2 8.5Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 12.5C2.55228 12.5 3 12.0523 3 11.5C3 10.9477 2.55228 10.5 2 10.5C1.44772 10.5 1 10.9477 1 11.5C1 12.0523 1.44772 12.5 2 12.5Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
                <input type="text" id="name_icon" placeholder="List Name " />
                <p id="name_error" className="error-message">
                  Please enter a list name.
                </p>
              </div>
              <div className="color-list-icon" id="color-list"></div>
            </form>
          );  
    }
}
export default AddListForm;
