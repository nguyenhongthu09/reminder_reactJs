import React from "react";

const ReminderContext = React.createContext();

class ReminderProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListId: props.selectedListId,
      nameList: props.nameList,
    };
  }

  render() {
    return (
      <ReminderContext.Provider value={this.state}>
        {this.props.children}
      </ReminderContext.Provider>
    );
  }
}

export { ReminderProvider, ReminderContext };
