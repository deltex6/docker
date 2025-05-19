// pobieranie potrzebnych bibliotek
const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

// Wczytanie konfiguracji
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
const AUTHOR = config.author;
const PORT = process.env.PORT || config.port;

const app = express();

// Wyswietlanie informacji
app.listen(PORT, () => {
  const startDate = new Date().toISOString();
  console.log(`Aplikacja uruchomiona: ${startDate}`);
  console.log(`Autor programu: ${AUTHOR}`);
  console.log(`Nasłuchuje na porcie TCP: ${PORT}`);
});

// Wyswietlanie front-endu
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint 'HTTP GET' do pobierania pogody
app.get('/weather', async (req, res) => {
  const { country, city } = req.query;
  try {
    const apiKey = process.env.OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&units=metric&lang=pl&appid=${apiKey}`;
    // Wyslanie zapytania
	const response = await axios.get(url);
    const { weather, main } = response.data;
	// Zwracanie opisu pogody
    res.json({ description: weather[0].description, temperature: main.temp });
	// Lapanie bledu jezeli pobieranie danych pogodowych sie nie powiedzie (np jak sa wybrane zle opcje z listy)
  } catch (error) {
    res.status(500).json({ error: 'Błąd pobierania danych pogodowych' });
  }
});