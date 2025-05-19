```
tomas@SwMMKolbe:~/zadanie1/progtest1$ docker build --build-arg VERSION=1.0.1 -t zad1 .
[+] Building 2.7s (13/13) FINISHED                                                     docker:default
 => [internal] load build definition from dockerfile                                             0.0s
 => => transferring dockerfile: 918B                                                             0.0s
 => [internal] load metadata for docker.io/library/node:18-alpine                                1.5s
 => [auth] library/node:pull token for registry-1.docker.io                                      0.0s
 => [internal] load .dockerignore                                                                0.0s
 => => transferring context: 2B                                                                  0.0s
 => [nodebuilder 1/5] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f  0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d11894  0.0s
 => [internal] load build context                                                                0.0s
 => => transferring context: 258B                                                                0.0s
 => CACHED [nodebuilder 2/5] WORKDIR /app                                                        0.0s
 => CACHED [nodebuilder 3/5] COPY package.json .                                                 0.0s
 => CACHED [nodebuilder 4/5] RUN npm install --production                                        0.0s
 => CACHED [nodebuilder 5/5] COPY . .                                                            0.0s
 => CACHED [stage-1 1/2] COPY --from=nodebuilder /app /app                                       0.0s
 => CACHED [stage-1 2/2] COPY config.json /app/config.json                                       0.0s
 => exporting to image                                                                           1.0s
 => => exporting layers                                                                          0.0s
 => => exporting manifest sha256:94e9cbbcd735df60b584a2d8d127a9728955df30e0d5b53c492577970d339a  0.0s
 => => exporting config sha256:0bc149152d55d55d2b6fb001786e1c714487120412787f9433ba738d17fa386d  0.0s
 => => exporting attestation manifest sha256:7ba667c8b9c99cda6150e0d28ec8541a42e1a96272d6882db8  0.0s
 => => exporting manifest list sha256:1636a910b7c27d06f85c57474cbaeeba95628f8b076ee1cc2ce2af1ba  0.0s
 => => naming to docker.io/library/zad1:latest                                                   0.0s
 => => unpacking to docker.io/library/zad1:latest                                                0.8s
tomas@SwMMKolbe:~/zadanie1/progtest1$ docker run -d --name pogodapp1 -p 3000:3000 -e OPENWEATHER_KEY=837c5e67471ea2f89469c35bd06b18ec zad1
64eccf6ce364eedd2c0942ac8d0361838dcab932488d805cb3116a0253e0ab45
tomas@SwMMKolbe:~/zadanie1/progtest1$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                    PORTS                            NAMES
64eccf6ce364   zad1           "docker-entrypoint.s…"   19 seconds ago   Up 18 seconds (healthy)   0.0.0.0:3000->3000/tcp           pogodapp1
daa63ce00115   a3d8aaa63ed8   "/entrypoint.sh /etc…"   8 weeks ago      Up 2 hours                0.0.tomas@SwMMKolbe:~/zadanie1/progtest1$ docker logs pogodapp1

> progtest1@1.0.0 start
> node server.js

Aplikacja uruchomiona: 2025-05-19T04:38:05.766Z
Autor programu: Tomasz Persa
Nasłuchuje na porcie TCP: 3000
tomas@SwMMKolbe:~/zadanie1/progtest1$ docker history zad1
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
1636a910b7c2   28 minutes ago   CMD ["npm" "start"]                             0B        buildkit.dockerfile.v0
<missing>      28 minutes ago   HEALTHCHECK &{["CMD-SHELL" "wget --spider --…   0B        buildkit.dockerfile.v0
<missing>      28 minutes ago   EXPOSE map[3000/tcp:{}]                         0B        buildkit.dockerfile.v0
<missing>      28 minutes ago   LABEL author=Tomasz Persa                       0B        buildkit.dockerfile.v0
<missing>      28 minutes ago   COPY config.json /app/config.json # buildkit    4.1kB     buildkit.dockerfile.v0
<missing>      28 minutes ago   COPY /app /app # buildkit                       4.1kB     buildkit.dockerfile.v0
<missing>      28 minutes ago   COPY . . # buildkit                             36.9kB    buildkit.dockerfile.v0
<missing>      2 hours ago      RUN |1 VERSION=1.0.1 /bin/sh -c npm install …   17.4MB    buildkit.dockerfile.v0
<missing>      3 days ago       COPY package.json . # buildkit                  12.3kB    buildkit.dockerfile.v0
<missing>      3 days ago       WORKDIR /app                                    8.19kB    buildkit.dockerfile.v0
<missing>      3 days ago       ENV VERSION=1.0.1                               0B        buildkit.dockerfile.v0
<missing>      3 days ago       ARG VERSION=1.0.1                               0B        buildkit.dockerfile.v0
<missing>      7 weeks ago      CMD ["node"]                                    0B        buildkit.dockerfile.v0
<missing>      7 weeks ago      ENTRYPOINT ["docker-entrypoint.sh"]             0B        buildkit.dockerfile.v0
<missing>      7 weeks ago      COPY docker-entrypoint.sh /usr/local/bin/ # …   20.5kB    buildkit.dockerfile.v0
<missing>      7 weeks ago      RUN /bin/sh -c apk add --no-cache --virtual …   5.47MB    buildkit.dockerfile.v0
<missing>      7 weeks ago      ENV YARN_VERSION=1.22.22                        0B        buildkit.dockerfile.v0
<missing>      7 weeks ago      RUN /bin/sh -c addgroup -g 1000 node     && …   122MB     buildkit.dockerfile.v0
<missing>      7 weeks ago      ENV NODE_VERSION=18.20.8                        0B        buildkit.dockerfile.v0
<missing>      3 months ago     CMD ["/bin/sh"]                                 0B        buildkit.dockerfile.v0
<missing>      3 months ago     ADD alpine-minirootfs-3.21.3-x86_64.tar.gz /…   8.5MB     buildkit.dockerfile.v0
tomas@SwMMKolbe:~/zadanie1/progtest1$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
zad1         latest    1636a910b7c2   28 minutes ago   202MB
lab5-app     latest    8e92f93a9c96   5 weeks ago      73.1MB
my-app1-1    latest    d050d0d6fe1a   5 weeks ago      12.2MB
my-app1      latest    d7577fe0689d   5 weeks ago      12.2MB
dockerfile   latest    ada20284cd49   6 weeks ago      12.1MB
```
