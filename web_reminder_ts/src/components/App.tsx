import React from "react";
import { Provider } from 'react-redux';
// import { ListProvider } from "../context/listNote.context";
import Lists from "./lists/Lists";
import { ReminderProvider } from "../context/reminder.context";
import { ListNoteProvider } from "../store/context/listNote.context";
import {store} from "../store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <ListNoteProvider>
        <ReminderProvider>
          <Lists />
        </ReminderProvider>
      </ListNoteProvider>
      </Provider>
    </div>
  );
}

export default App;
