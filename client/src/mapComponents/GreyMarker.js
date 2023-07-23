import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'; // import the "add" icon


function GreyMarkers({coordinates, selectedMarker, setSelectedMarker}) {
  const [isHovered, setIsHovered] = useState({});

  let selectMarkerLat;
  let selectMarkerLng;

  if (selectedMarker){
    selectMarkerLng = selectedMarker.split('-').map(Number)[0]
    selectMarkerLat = selectedMarker.split('-').map(Number)[1]

  }

  const handleMapClick = () => {
    if(selectedMarker) {
      setSelectedMarker(null);
    }
  }
  //coordinates = coordinates.filter(coord => !(coord[0] === selectMarker[0] && coord[1] === selectMarker[1]));
  return (
  <div>
  {coordinates.length > 0 && coordinates.map((coord, index) => (
      <div 
        key={`marker-${index}`} 
        onMouseEnter={() => setIsHovered(prevState => ({ ...prevState, [index]: true }))}
        onMouseLeave={() => setIsHovered(prevState => ({ ...prevState, [index]: false }))}
        onClick={(e) => {
            e.stopPropagation();
            setSelectedMarker(`${coord[0]}-${coord[1]}`);
          }}
      >
        <Marker latitude={coord[1]} longitude={coord[0]}>
          <div style={{ 
            border: '1px solid #ffffff', 
            backgroundColor: isHovered[index] ? 'orange' : '#808080', // change color on hover
            borderRadius: '50%', 
            width: isHovered[index] ? '18px' : '13px', // make larger on hover
            height: isHovered[index] ? '18px' : '13px', 
            cursor: 'pointer' // hand pointer cursor
          }}/>
        </Marker>
      </div>
  ))}
        
  {selectedMarker && (
    <div onClick={handleMapClick}>
        <Popup
        className="transparent-popup"
        latitude={selectMarkerLat}
        longitude={selectMarkerLng}
        closeButton={false}
        closeOnClick={false}
        onClose={() => setSelectedMarker(null)}
        
        >
        <div style={{ backgroundColor: 'transparent' }}>
            <AiOutlinePlusCircle size={32} color="red" /> {/* Change size and color */}
        </div>
        </Popup>

        <Marker latitude={selectMarkerLat} longitude={selectMarkerLng}>
            <div style={{ 
                border: '1px solid #ffffff', 
                backgroundColor: 'orange', // change color on hover
                borderRadius: '50%', 
                width: '13px', // make larger on hover
                height: '13px', 
                cursor: 'pointer' // hand pointer cursor
            }}/>
    </Marker>
    </div>
    
    )}
  </div>
  );
};

export default GreyMarkers;