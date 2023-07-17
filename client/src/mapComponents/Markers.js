import React from "react";
import { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

function Markers({coordinates, cities}) {
  return (
    <div>
    {coordinates.length > 0 && coordinates.map((coord, index) => (
      <div key={`marker-${index}`}>
        <Marker latitude={coord[1]} longitude={coord[0]}>
          <div style={{ 
            border: '3px solid #3887be',  // thicker blue border
            backgroundColor: '#ffffff',   // white background
            borderRadius: '50%', 
            width: '8px',                 // smaller circle
            height: '8px' 
          }}/>
        </Marker>
        
        <Popup latitude={coord[1]} longitude={coord[0]} closeButton={false} closeOnClick={false} anchor="bottom" offsetTop={-10} className="myPopup">
          <div>{cities[index]}</div>
        </Popup>
      </div>
    ))}
  </div>
  );
};

export default Markers;
