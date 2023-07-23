import React, { useState } from "react";
import { Marker } from "react-map-gl";
import './Markers';

function GreyMarkerDiv({index, coord, setSelectedMarker }) {
    const [isHovered, setIsHovered] = useState({});
    return (
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
    )
    };

export default GreyMarkerDiv;