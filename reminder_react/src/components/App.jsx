// import Lists from "./lists/Lists";
import { ListProvider } from "../context/ListContext";
import ListContextEx from "./lists/ListContextEx";
// import { ListProvider } from "../store";
// import ContextListEx from "./lists/ComponentContext"

import { ReminderProvider } from "../context/ReminderContext";
function App() {
  return (
    <div className="App">
      <ListProvider>
        <ReminderProvider>
          <ListContextEx />
        </ReminderProvider>
      </ListProvider>
    </div>
  );
}

export default App;
