UŻYTE KOMENDY:
--------------

__Budowanie obrazu w wersji '1.0.1' o nazwie 'zad1':__
docker build --build-arg VERSION=1.0.1 -t zad1 .


__Tworzenie i uruchomienie kontenera o nazwie 'pogodapp1', w tle z wystawionym portem 3000, przekierowanym na port hosta 3000, z podanym kluczem api do pogody:__
docker run -d --name pogodapp1 -p 3000:3000 -e OPENWEATHER_KEY=837c5e67471ea2f89469c35bd06b18ec zad1


__Sprawdzenie, czy połączenie serwera działa (czy jest status 'healthy'):__
docker ps


__Wyświetlenie informacji w logach o dacie uruchomienia, imieniu i nazwisku autora programu oraz porcie TCP, na którym aplikacja 'nasłuchuje':__
docker logs pogodapp1


__Sprawdzenie ile warstw posiada zbudowany obraz:__
docker history zad1


__Sprawdzenie jaki jest rozmiar obrazu:__
docker images
