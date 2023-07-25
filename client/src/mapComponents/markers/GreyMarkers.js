import React from "react";
import GreyMarkerDiv from "./GreyMarkerDiv";
import SelectedMarker from "./SelectedMarker";

function GreyMarkers({coordinates, selectedMarker, setCoordinates, setSelectedMarker}) {
   return (
  <div>
    {coordinates.length > 0 && coordinates.map((coord, index) => (
      <GreyMarkerDiv key={coord} index={index} coord={coord} setSelectedMarker={setSelectedMarker}/>
    ))}
       
    {selectedMarker && 
    <SelectedMarker selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} setCoordinates={setCoordinates}/>
    }
  </div>
  );
};

export default GreyMarkers;