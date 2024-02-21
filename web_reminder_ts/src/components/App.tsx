import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lists from "./lists/Lists";
import { store } from "../store";

function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Routes>
            <Route path="*" element={<Lists />}></Route>
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
