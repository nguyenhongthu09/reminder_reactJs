import { ListProvider } from "../context/ListContext";
import ListContextEx from "./lists/ListContextEx";

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
