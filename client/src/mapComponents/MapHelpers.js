

function getViewportForLocations(locations) {
  const longitudes = locations.map(loc => loc[0]);
  const latitudes = locations.map(loc => loc[1]);
  const minLong = Math.min(...longitudes);
  const maxLong = Math.max(...longitudes);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);

  const longitudeMid = (minLong + maxLong) / 2;
  const latitudeMid = (minLat + maxLat) / 2;

  let maxDiff = Math.max(maxLong - minLong, maxLat - minLat);
  maxDiff += maxDiff * 0.1; // Add a bit of padding

  const zoom = Math.floor(Math.log2(360 * ((window.innerWidth || document.documentElement.clientWidth) / 256) / maxDiff));

  return {
    latitude: latitudeMid,
    longitude: longitudeMid,
    zoom: Math.max(1, zoom  - 1.5) // Ensure the zoom is at least 1 (to prevent zooming out too far)
  };
}


function fetchCoordinatesForCities(cities, setCoordinates, setViewport){
  const citiesString = cities.join(",");
  fetch(`/coordinates?cities=${citiesString}`)
    .then(response => response.json())
    .then(data => {
      setCoordinates(data); // Save the returned coordinates to the state
      setViewport(getViewportForLocations(data))
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


async function handleMapClick(event) {
  // Get click coordinates
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  const longitude = event.lngLat.lng;
  const latitude = event.lngLat.lat;

  // Call geocoding service to translate coordinates to city name
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
  );
  const data = await response.json();
  const cityName = data.features[0]?.place_name || '';  // we take the first place's name

  // Add city to itinerary
  if (cityName) {
    console.log(cityName)
    //addCityToItinerary(cityName);
  } else {
    alert('Could not determine city name from clicked location.');
  }
}

export { fetchCoordinatesForCities, handleMapClick };
