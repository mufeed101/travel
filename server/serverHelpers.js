import { MongoClient } from 'mongodb';


// Convert zoom level to radius (in meters)
function zoomToRadius(zoom) {
    return 35000  / Math.pow(2, zoom);
  }


export { zoomToRadius };

