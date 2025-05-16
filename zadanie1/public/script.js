document.getElementById('checkBtn').addEventListener('click', async () => {
  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;
  const resultDiv = document.getElementById('result');

  resultDiv.textContent = 'Ładowanie...';

  try {
    const response = await fetch(`/weather?country=${country}&city=${city}`);
    const data = await response.json();
    if (data.error) {
      resultDiv.textContent = data.error;
    } else {
      resultDiv.textContent = `Pogoda: ${data.description}, temperatura: ${data.temperature}°C`;
    }
  } catch (err) {
    resultDiv.textContent = 'Błąd sieci';
  }
});