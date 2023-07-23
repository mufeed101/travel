

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


async function fetchProximateCities(viewport){
  const response = await fetch('/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(viewport)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json(); // return the cities data from the response.
  }
}

function filterCoordinates(coordinates, citiesToAdd){
  const roundedCoordinates = coordinates.map(coord => [Math.round(coord[0]), Math.round(coord[1])]);
  const roundedCoordinatesSet = new Set(roundedCoordinates.map(coord => coord.join(',')));
  const result = citiesToAdd.filter(
    (coord) => {
      const roundedCoord = [Math.round(coord[0]), Math.round(coord[1])];
      //console.log("roundedCoord: ", roundedCoord);
      return !roundedCoordinatesSet.has(roundedCoord.join(','));
  });
  return result

}

async function fetchCoordinatesForCities(cities){
  const citiesString = cities.join(",");
  
  const coordtinates = await fetch(`/coordinates?cities=${citiesString}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });

  return coordtinates
}

async function setCitiesToAddCoord(view, coordinates, setaddCityCoordinates){
  const { latitude, longitude, zoom } = view;

  const citiesToAdd = await fetchProximateCities({ latitude, longitude, zoom });
  const filteredCitiesToAdd = filterCoordinates(coordinates, citiesToAdd)

  setaddCityCoordinates(filteredCitiesToAdd)
}

export { fetchCoordinatesForCities, fetchProximateCities, filterCoordinates, getViewportForLocations, setCitiesToAddCoord };
