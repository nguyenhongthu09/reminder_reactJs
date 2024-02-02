import React from "react";
import { ListProvider } from "../context/listNote.context";
import Lists from "./lists/Lists";
import { ReminderProvider } from "../context/reminder.context";
function App() {
  return (
    <div className="App">
      <ListProvider>
        <ReminderProvider>
          <Lists />
        </ReminderProvider>
      </ListProvider>
    </div>
  );
}

export default App;
