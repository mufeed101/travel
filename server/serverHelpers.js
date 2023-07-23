import { MongoClient } from 'mongodb';


// Convert zoom level to radius (in meters)
function zoomToRadius(zoom) {
    return 35000000  / Math.pow(2, zoom);
  }


function fetchClient(){
    const credentials = 'X509-cert-6720785281131994130.pem'
    const client = new MongoClient('mongodb+srv://cluster1.njucxlk.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    tlsCertificateKeyFile: credentials,
    serverApi: MongoClient.serverApiVersion,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    });

    return client;
}

function calculateLimit(zoom) {
    // Adjust these numbers as needed
    const maxZoom = 7;
    const minZoom = 4;
    const maxLimit = 40;
    const minLimit = 10;

    // Check if zoom is outside the range [minZoom, maxZoom]
    if (zoom <= minZoom) {
        return maxLimit; // Zoom is too low, return the maximum limit
    } else if (zoom >= maxZoom) {
        return minLimit; // Zoom is too high, return the minimum limit
    }

    // Sigmoid function to calculate the limit based on zoom level within the range [minZoom, maxZoom]
    let limit = Math.round(maxLimit - (maxLimit - minLimit) / (1 + Math.exp(-(zoom - 5) / 2)));

    // Ensure limit is at least 1
    if (limit < 1) limit = 1;

    return limit;
}

export { fetchClient, zoomToRadius, calculateLimit };

