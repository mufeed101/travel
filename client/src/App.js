import React, {useState } from "react";
import MapUI from './mapComponents/MapUI'
function App() {
  const [cities, setCities] = useState(["Istanbul", "Rome", "Florence", "Venice", "Vienna", "Prague", "Berlin", "Amsterdam"]);
  
  //This should mostly happen in the backend
  return (
    <MapUI cities={cities}/>
  );
};

export default App;
