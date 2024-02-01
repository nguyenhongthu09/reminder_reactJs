import React from "react";
import { ListProvider } from "../context/listNote.context.tsx";
import Lists from "./lists/Lists.tsx";
import { ReminderProvider } from "../context/reminder.context.tsx";
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
