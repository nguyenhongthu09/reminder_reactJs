import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lists from "./lists/Lists";
import { store } from "../store";
import { ListNoteProvider } from "../store/context/listNote.context";

function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <ListNoteProvider>
            <Routes>
              <Route path="*" element={<Lists />} />
            </Routes>
          </ListNoteProvider>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
