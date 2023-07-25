import React, { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from "./markers/Markers";
import GreyMarkers from "./markers/GreyMarkers";
import Lines from "./Lines";
import { debounce } from 'lodash';
import { fetchCoordinatesForCities, getViewportForLocations, setCitiesToAddCoord } from "./MapHelpers";

function Map({cities}) {
  const [coordinates, setCoordinates] = useState([])
  const [addCityCoordinates, setaddCityCoordinates] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: 70,
    zoom: 3,
  });

  async function fetchCoordinatesForCitiesFunction(cities){
    const data = await fetchCoordinatesForCities(cities);
    setCoordinates(data); // Save the returned coordinates to the state
    
    const newViewport = getViewportForLocations(data);
    setViewport(newViewport);

  }
  useEffect(
    () => {
      if(cities && cities.length > 1){
        console.log(cities)
        fetchCoordinatesForCitiesFunction(cities)
      }
    }
    ,[cities]
  )

  useEffect(
    () => {
      if(viewport){
        
      setCitiesToAddCoord(viewport, coordinates, selectedMarker, setaddCityCoordinates);
      }
    }
    ,[coordinates]
  )

  async function handleViewportChange(evt) {
    setViewport(evt.viewport);
    setCitiesToAddCoord(evt.viewState, coordinates, selectedMarker, setaddCityCoordinates)
  }
  
  const debouncedHandleViewportChange = debounce(handleViewportChange, 300);

  const mapProps = {
    ...viewport,
    dragPan: true,
    width: "100%",
    height: "100%",
    mapboxAccessToken: "pk.eyJ1IjoibW9vbWF0aWE4IiwiYSI6ImNsanliOWhvZDAydjUzaW4xbGMzdGxvMmMifQ.bMjgtyFCN3pvEQrF7hW_hQ",
    mapStyle: "mapbox://styles/mapbox/streets-v11",
    onMove: debouncedHandleViewportChange 
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL onClick={() => setSelectedMarker(null)} {...mapProps}>
        <Markers coordinates={coordinates} cities={cities}/>
        
        <Lines coordinates={coordinates}></Lines>
        <GreyMarkers 
          coordinates={addCityCoordinates} 
          selectedMarker={selectedMarker} 
          setCoordinates={setCoordinates}
          setSelectedMarker={setSelectedMarker}
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;
