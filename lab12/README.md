# Sprawozdanie

## Użyte komendy

```
tomas@SwMMKolbe:~$ mkdir lab12
tomas@SwMMKolbe:~$ cd lab12/
tomas@SwMMKolbe:~/lab12$ touch docker-compose.yaml
tomas@SwMMKolbe:~/lab12$ mkdir php
tomas@SwMMKolbe:~/lab12$ mkdir nginx
tomas@SwMMKolbe:~/lab12$ touch nginx/default.conf
tomas@SwMMKolbe:~/lab12$ touch php/index.php
tomas@SwMMKolbe:~/lab12$ nano docker-compose.yaml
tomas@SwMMKolbe:~/lab12$ nano php/index.php
tomas@SwMMKolbe:~/lab12$ nano php/index.php

tomas@SwMMKolbe:~/lab12$ docker-compose up -d

tomas@SwMMKolbe:~/lab12$ docker compose ps
```

</br>


## Zrzuty ekranu


![1  Docker Composer file](https://github.com/user-attachments/assets/ba828f58-95c5-425c-a965-0d29ce1d88dd)

_Zdj.1 Plik 'docker-compose.yaml'_


</br></br>


![2  index_php](https://github.com/user-attachments/assets/1fc10113-3ec8-4639-9beb-c67b9742ca2e)

_Zdj.2 Plik 'index.php'_


</br></br>



![3  docker nginx default conf](https://github.com/user-attachments/assets/dccc23df-b702-4902-a520-e505c3ef15d9)

_Zdj.3 Plik 'default.conf'_

</br></br>



![4  docker_compose_command](https://github.com/user-attachments/assets/f3322690-a9e8-4acc-b477-6f342c5999fd)

_Zdj.4 Wywołanie komendy 'docker compose up -d'_

</br></br>

![4  docker_compose_command](https://github.com/user-attachments/assets/db42fcaa-f5e5-48f2-a912-f93cb8756220)

_Zdj.5 Wywołanie komendy 'docker compose ps'_

</br></br>

![6  PHPMyAdmin](https://github.com/user-attachments/assets/b2f8396a-2433-46e5-9520-767d0417f582)

_Zdj.6 Wyświetlona strona PHPMyAdmin_

</br></br>

![7  StronaInternetowa](https://github.com/user-attachments/assets/65e9081b-725e-456e-8726-d7a6192e3b08)

_Zdj.7 Porblem z wyswietleniem strony 'index.php'_

</br></br>

> [!NOTE]
> DLa kontenera MySQL zmieniono port z 3307 na 3306, ponieważ 3306 był zajętym portem (prawdopodobnie przez inny mikroserwis mysql) i nie dało się wyłączyć przeszkadzającego mikroserwisu
>
> Nie udało się wyświetlić strony z 'index.php' po wprowadzeniu URL: 'localhos:4001' z niewiadomych przyczyn.
