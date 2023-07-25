import express from 'express';
import { Redis } from 'ioredis';

import { zoomToRadius } from './serverHelpers.js';

const app = express()


const redis = new Redis({})

//const fetch = require('node-fetch');
// es6 syntax
import fetch from 'node-fetch';

// Middleware to parse JSON bodies
app.use(express.json());


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


app.post('/cities', async (req, res) => {
    const { latitude, longitude, zoom } = req.body
    if(!latitude || !longitude || !zoom){
      return res.status(400).json({ error: 'Either Latitude, longitude or zoom not provided' });
    }
    
    const coordinates = await redis.georadius('cities', longitude, latitude, zoomToRadius(zoom), 'km');

    // Get population for each city
    const citiesWithPop = await Promise.all(coordinates.map(async coord => {
      const population = await redis.zscore('cities_pop', coord);
      return { coord, population };
    }));

    // Sort cities by population
    const sortedCities = citiesWithPop.sort((a, b) => b.population - a.population);

    // Get top 40 cities
    const topCities = sortedCities.slice(0, 40);
    const finalOutput = topCities.map(city => {
      const [longitude, latitude] = city.coord.split(',').map(Number);
      return [latitude, longitude];
    });
    res.json(finalOutput);
});

app.listen(5000, () => { console.log("Server started on port 5000") })