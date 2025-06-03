# Sprawozdanie

## 1. Ustawienie zmiennych środowiskowych oraz 'secret-ów'
* Wygenerowanie PAT na Github
* Wygenerowanie tokena na Dockerhub
* Ustawienie zmiennych środowiskowych dla projektu
* Ustawienie 'secret-ów' dla projektu



## 2. Opracowanie łańcucha (pipeline) w usłudze GitHub Actions

### Obraz spełnia warunki:
* Wpiera architekturę linux/arm64 oraz linux/amd64
* są wykorzystywane dane cache (eksporter: registry oraz backend-u registry w trybie max) zamieszczone w publicznym repozytorium na [DockerHub](https://hub.docker.com/r/timtur/zadanie2-cache).
* Test CVE obrazu, który miał zapewnić, że obraz by był przesłany do publicznego repozytorium obrazów na GitHub, pod warunkiem, że obraz nie będzie zawierał zagrożeń sklasyfikowanych jako krytyczne lub wysokie został wykonany, jednakże nie dało się wyeliminować zagrożeń (_**1 critical i 4 high** z powodu braku możliwości pobrania nowszej wersji paczki `pkg:golang/stdlib@1.22.4`_)

  
(Plik 'zad2.yml' - instrukcja do wyzwolenia usługi Github Actions dla tego zadania znajduje się w katalogu 'docker/.github/workflows/')

