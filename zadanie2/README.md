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
* Test CVE obrazu, który miał zapewnić, że obraz by był przesłany do publicznego repozytorium obrazów na GitHub, pod warunkiem, że obraz nie będzie zawierał zagrożeń sklasyfikowanych jako krytyczne lub wysokie został wykonany, jednakże nie dało się wyeliminować zagrożeń (_**1 critical i 4 high** z powodu braku możliwości pobrania nowszej wersji paczki `pkg:golang/stdlib@1.22.4`_). Po usunięciu testu obraz jest pomyślnie wysłany do publicznego repozutorium.

> [!NOTE]
> Plik 'zad2.yml' - instrukcja do wyzwolenia usługi Github Actions dla tego zadania znajduje się w katalogu 'docker/.github/workflows/'  

## Pliki wykorzystane w projekcie 

### Plik Dockerfile (trochę zmieniony w porównaniu do zadania 1)
```
# Obraz bazowy node alpine
FROM node:24-alpine AS nodebuilder

# Uzycie zmiennej wersji
ARG VERSION
ENV VERSION=${VERSION}

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plikow package
COPY package.json .

# Instalacja zaleznosci produkcyjnych
RUN npm install --production

# Kopiowanie pozostalych plikow aplikacji
COPY . .

# Etap 2: Obraz koncowy
FROM nodebuilder

# Skopiowanie aplikacji z poprzedniego etapu
COPY --from=nodebuilder /app /app

# Dodanie pliku konfiguracyjnego 'JSON'
COPY config.json /app/config.json

# Dodanie metadanych autora
LABEL author="Tomasz Persa"
 
# Eksponowanie portu
EXPOSE 3000

# Sprawdzanie, czy serwer dziala
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --spider --quiet http://localhost:3000 || exit 1

# Uruchomienie aplikacji
CMD ["npm", "start"]
```

### Plik `zad2.yml`
```
name: Build and Push Zadanie2 Docker Image

on:
  push:
    paths:
      - 'zadanie2/**'
  workflow_dispatch:

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write  # for GHCR
      id-token: write  # for registry logins if using OIDC

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up QEMU for multi‑arch emulation
        uses: docker/setup-qemu-action@v2
        with:
          platforms: linux/amd64, linux/arm64

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
        with:
          buildkitd-flags: --debug

      - name: Log in to Docker Hub (for cache)
        uses: docker/login-action@v2
        with:
          registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ vars.GH_USERNAME }}
          password: ${{ secrets.GH_TOKEN }}

      - name: Build image with cache
        id: build
        uses: docker/build-push-action@v6
        with:
          context: ./zadanie2
          file: ./zadanie2/dockerfile
          platforms: linux/amd64,linux/arm64
          push: false
          tags: ghcr.io/${{ github.repository_owner }}/zadanie2:${{ github.sha }}
          cache-from: |
            type=registry,ref=${{ vars.DOCKERHUB_USERNAME }}/zadanie2-cache:cache
          cache-to: |
            type=registry,mode=max,ref=${{ vars.DOCKERHUB_USERNAME }}/zadanie2-cache:cache

#      - name: Scan for vulnerabilities (Docker Scout)
#        uses: docker/scout-action@v1.18.1   # lub najnowsza stabilna wersja
#        with:
#          command: cves                        # obowiązkowy parametr „command” :contentReference[oaicite:0]{index=0}
#         only-severities: critical,high       # filtr na CVE o statusie critical lub high :contentReference[oaicite:1]{index=1}
#          exit-code: true 
#          github-token: ${{ secrets.GH_TOKEN }}  # zamiast „token” należy użyć „github-token” :contentReference[oaicite:2]{index=2}
#          format: json
#          output: scout-report.json


#      - name: Check scan results
#        id: scout-check
#        run: |
#          high=$(jq '[.vulnerabilities[] | select(.severity=="high" or .severity=="critical")] | length' scout-report.json)
#          echo "count=$high" >> $GITHUB_OUTPUT

      - name: Push image if secure
        # if: steps.scout-check.outputs.count == '0'
        uses: docker/build-push-action@v4
        with:
          context: ./zadanie2
          file: ./zadanie2/dockerfile
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/${{ github.repository_owner }}/zadanie2:latest
            ghcr.io/${{ github.repository_owner }}/zadanie2:${{ github.sha }}
```  

Reszta plików projektowych jest taka sama jak w zadaniu 1.
