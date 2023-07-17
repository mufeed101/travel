import React, { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from "./Markers";
import Lines from "./Lines";
import { fetchCoordinatesForCities, handleMapClick } from "./MapHelpers";

function Map({cities}) {
  const [coordinates, setCoordinates] = useState([])
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: 70,
    zoom: 3,
  });

  useEffect(
    () => {
      fetchCoordinatesForCities(cities, setCoordinates, setViewport)
    }
    ,[cities]
  )

  const mapProps = {
    ...viewport,
    dragPan: true,
    width: "100%",
    height: "100%",
    mapboxAccessToken: "pk.eyJ1IjoibW9vbWF0aWE4IiwiYSI6ImNsanliOWhvZDAydjUzaW4xbGMzdGxvMmMifQ.bMjgtyFCN3pvEQrF7hW_hQ",
    mapStyle: "mapbox://styles/mapbox/streets-v11",
    onMove: evt => setViewport(evt.viewport)
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL {...mapProps} onClick= {(event) => handleMapClick(event)}>
        <Markers coordinates={coordinates} cities={cities}></Markers>
        <Lines coordinates={coordinates}></Lines>
      </ReactMapGL>
    </div>
  );
};

export default Map;
