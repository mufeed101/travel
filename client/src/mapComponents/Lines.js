import React from "react";
import { Source, Layer} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

function Lines({coordinates}) {
    const data = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: coordinates,
        }
        };

    return (
    <div>
        {coordinates.length > 0 && 
        <Source id="route" type="geojson" data={data}>
            <Layer
            id="route"
            type="line"
            source="route"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{ "line-color": "#3887be", "line-width": 3 }}
            />
        </Source>
        }
    </div>
    );
};

export default Lines;
