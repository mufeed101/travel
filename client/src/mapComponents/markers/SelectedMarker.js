import React from "react";
import { Marker, Popup } from "react-map-gl";

import { AiOutlinePlusCircle } from 'react-icons/ai'; // import the "add" icon
import './Markers';

function SelectedMarker({ selectedMarker, setSelectedMarker }) {
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

    return (
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
    
    )};

export default SelectedMarker;