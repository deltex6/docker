const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

// Wczytanie konfiguracji
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
const AUTHOR = config.author;
const PORT = process.env.PORT || config.port;
const HEALTH_ENDPOINT = config.healthEndpoint;

const app = express();

// Endpoint healthz
app.get(HEALTH_ENDPOINT, (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Logowanie przy starcie
app.listen(PORT, () => {
  const startDate = new Date().toISOString();
  console.log(`Aplikacja uruchomiona: ${startDate}`);
  console.log(`Autor programu: ${AUTHOR}`);
  console.log(`Nasłuchuje na porcie TCP: ${PORT}`);
});

// Serwowanie front-endu
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pogody
app.get('/weather', async (req, res) => {
  const { country, city } = req.query;
  if (!country || !city) {
    return res.status(400).json({ error: 'Brakuje parametru country lub city' });
  }
  try {
    const apiKey = process.env.OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&units=metric&lang=pl&appid=${apiKey}`;
    const response = await axios.get(url);
    const { weather, main } = response.data;
    res.json({ description: weather[0].description, temperature: main.temp });
  } catch (error) {
    res.status(500).json({ error: 'Błąd pobierania danych pogodowych' });
  }
});