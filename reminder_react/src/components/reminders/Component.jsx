import React, { Component } from "react";
import { generateRandomStringId } from "../../untils/common";
import Icon from "../core/Icon";
import Input from "../core/Input";
class ComponentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id: generateRandomStringId(),
        name: "",
        isColor: "",
      },
    };
  }
  handleNameChange = (event) => {
    const inputValue = event.target.value;
    this.setState((prevData) => ({
      ...prevData,
      formData: {
        ...prevData.formData,
        name: inputValue,
      },
    }));
  };

    componentDidMount() {
      console.log("did mount");
      this.updateFormData();
    }

  componentDidUpdate(prevProps) {
    console.log("update");
    if (
      prevProps.formType !== this.props.formType ||
      prevProps.listData !== this.props.listData
    ) {
      this.updateFormData();
    }
  }

  updateFormData = () => {
    const { formType, listData } = this.props;

    if (formType === "edit" && listData) {
      const { id, name, isColor } = listData;
      this.setState({
        formData: {
          id: id,
          name: name,
          isColor: isColor,
        },
      });
    }
  };
  

  render() {
    const { formData } = this.state;
    console.log("log vi du", formData);

    return (
      <div className="form_add_list_name">
        <div
          className="fill-icon-color fill-color-edit"
          id="icon-color-edit"
          style={{ backgroundColor: formData.isColor }}
        >
          <span className="fill-color">
            <Icon type="notelist"></Icon>
          </span>
        </div>
        <Input
          id="name_edit-list"
          placeholder="Name List"
          value={formData.name}
          onChange={this.handleNameChange}
          //   onClick={this.handleInputClick}
        />
        <p id="name_error" className="error-message">
          Please enter a list name.
        </p>
      </div>
    );
  }
}

export default ComponentClass;



// componentWillUnmount() {
//   // eslint-disable-next-line no-restricted-globals
//   const userConfirmation = window.confirm("Are you sure you want to proceed?");
//   if (userConfirmation) {
//     this.setListForm(false);
//     console.log("User confirmed");
//   } else {
//     this.setListForm(true);
//     console.log("User canceled");
//   }
//   console.log("xoa");
// }