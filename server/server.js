import express from 'express';
const app = express()
//const fetch = require('node-fetch');
// es6 syntax
import fetch from 'node-fetch';

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})


app.get('/coordinates', async (req, res) => {
    // Ensure cities are sent as query parameters
    if (!req.query.cities) {
        return res.status(400).send('Missing cities');
    }
    const cities = req.query.cities.split(',');

    const fetchCoordinates = (city) => {
        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoibW9vbWF0aWE4IiwiYSI6ImNsanliOWhvZDAydjUzaW4xbGMzdGxvMmMifQ.bMjgtyFCN3pvEQrF7hW_hQ`)
          .then(response => response.json())
          .then(data => data.features[0].center);
    };
    
    Promise.all(cities.map(fetchCoordinates))
    .then(coordinates => res.json(coordinates))
    .catch(error => res.status(500).send(error));  
})

app.listen(5000, () => { console.log("Server started on port 5000") })