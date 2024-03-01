import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListNoteProvider } from "../store/context/listNote.context";
import HomeLists from "./home/Lists";
import FormList from "./list-form/ListForm";
import ReminderFormAdd from "./reminder-add-form/ReminderFormAdd";
import RemindersPage from "./reminders/Reminders";
import ReminderFormAddInList from "./reminders/ReminderFormAddInList";
import ReminderFormEdit from "./reminders/ReminderFormEdit";
import store from "../redux-toolkit/store/store";

function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <ListNoteProvider>
            <Routes>
              <Route path="/" element={<HomeLists />} />
              <Route path="/lists/addList" element={<FormList />} />
              <Route path="/lists/editlist/:id" element={<FormList />} />
              <Route path="/formAddReminder" element={<ReminderFormAdd />} />
              <Route
                path="/lists/:id/reminders/:name"
                element={<RemindersPage />}
              >
                <Route
                  path="reminderFormAddInList"
                  element={<ReminderFormAddInList />}
                />
                <Route
                  path="reminder/:idReminder"
                  element={<ReminderFormEdit />}
                />
              </Route>
            </Routes>
          </ListNoteProvider>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
