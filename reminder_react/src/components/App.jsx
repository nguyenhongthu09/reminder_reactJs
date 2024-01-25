// import Lists from "./lists/Lists";
// import { ListProvider } from "../context/ListContext";
// import ListContextEx from "./lists/ListContextEx"
import { ListProvider } from "../store";
import ContextListEx from "./lists/ComponentContext"
function App() {
  return (
    <div className="App">
      <ListProvider>
        {/* <Lists /> */}
        <ContextListEx/>
      </ListProvider>
    </div>
  );
}

export default App;
