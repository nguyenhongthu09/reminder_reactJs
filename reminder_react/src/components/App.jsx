import { useState } from "react";
import Lists from "./lists/Lists";
import ComponentList from "./lists/ComponentList"
function App() {

  // const [isShow, setIsShow] = useState(true)
  return (
    <div className="App">
      {/* <ComponentList/> */}
      <Lists/>
   {/* {isShow && <Lists />}   
   <button onClick={()=>setIsShow(prevState => !prevState)}>chang</button> */}
    </div>
  );
}

export default App;
