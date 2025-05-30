// Wykonanie akcji po kliknieciu w przycisk "Sprawdz pogode"
document.getElementById('checkBtn').addEventListener('click', async () => {
  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;
  const resultDiv = document.getElementById('result');

  resultDiv.textContent = 'Ładowanie...';

	// Wyslanie zapytania do endpointu '/weather'
    const response = await fetch(`/weather?country=${country}&city=${city}`);
    const data = await response.json();
	// Sprawdzanie, czy nie ma bledu w danych
    if (data.error) {
      resultDiv.textContent = 'Blad wczytywania danych';
    } else {
	  // Wyswietlanie pogody i temperatury
      resultDiv.textContent = `Pogoda: ${data.description}, temperatura: ${data.temperature}°C`;
    }
});