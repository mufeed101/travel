import React, {useState } from "react";
import {  BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes }  from 'react-router-dom';
import MapUI from './mapComponents/MapUI'
import SearchPage from "./SearchPage";

//"Istanbul", "Rome", "Florence", "Venice", "Vienna", "Prague", "Berlin", "Amsterdam"
function App() {
  const [cities, setCities] = useState([]);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">

      </Route>
    )
  )
  //This should mostly happen in the backend
  return (
    <BrowserRouter>
        <Routes>
       <Route path="/" element={ <SearchPage/> } />
       <Route path="/plan" element={ <MapUI cities={cities} /> } />
      
       </Routes>
      </BrowserRouter>
  );
};

export default App;
