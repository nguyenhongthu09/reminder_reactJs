import { useState } from "react";
import Lists from "./lists/Lists";
function App() {

  // const [isShow, setIsShow] = useState(true)
  return (
    <div className="App">
      <Lists/>
   {/* {isShow && <Lists />}   
   <button onClick={()=>setIsShow(prevState => !prevState)}>chang</button> */}
    </div>
  );
}

export default App;
