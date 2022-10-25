# 📝 DevOps WIK-DPS-TP02

## Initialisation

Run `npm install` to download project dependencies :

```
npm install
```

## Start Web Server

To start the web server run :

```
node ./build/index
```

You can choose the listening port with `PING_LISTEN_PORT` env variable as follow :

```
PING_LISTEN_PORT=3000 node ./build/index
```

## Test

You can try the `/ping` with `curl` :

```
curl http://localhost:3000/ping -v
```

It will return JSON Header :

```
{"host":"localhost:3000","user-agent":"curl/7.77.0","accept":"*/*"}
```

## Docker

Build image :

```
docker build -t wik-dps-02 .
```

Start image :

```
docker run --name wik-dps-02 --rm -it -p 3000:3000 wik-dps-02
```

### Dockerfile optimisation

#### Reducing the Number of Processes :

Firt we check the Number of Processes running :

```
docker exec wik-dps-02 ps -eo pid,ppid,user,args --sort pid
```

_Output :_

```
  PID  PPID USER     COMMAND
    1     0 root     /bin/sh -c npm run start
    8     1 root     npm run start
   19     8 root     sh -c /tmp/start666728476.sh
   20    19 root     sh /tmp/start666728476.sh
   21    20 root     node ./build/index
   45     0 root     ps -eo pid,ppid,user,args --sort pid
```

**1. Avoid using npm script :**

Do not use npm script fort CMD

_New Output :_

```
josephcloux@MBP-de-Joseph WIK-DPS-TP02 % docker exec wik-dps-02 ps -eo pid,ppid,user,args --sort pid
  PID  PPID USER     COMMAND
    1     0 root     /bin/sh -c node ./build/index
    8     1 root     node ./build/index
   15     0 root     ps -eo pid,ppid,user,args --sort pid
```

**2. Using the Exec Form**

Updated `Dockerfile` in Exec Form :

```dockerfile
# Stage 1
FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN ["npm", "install"]
EXPOSE 3000
RUN ["npm", "run", "tsc"]
CMD ["node", "./build/index"]
```

_Docker exec Output :_

```
josephcloux@MBP-de-Joseph WIK-DPS-TP02 % docker exec wik-dps-02 ps -eo pid,ppid,user,args --sort pid
  PID  PPID USER     COMMAND
    1     0 root     node ./build/index
   14     0 root     ps -eo pid,ppid,user,args --sort pid
```

> **ℹ️ Summary :** <br>
> We have reduced the numbers of processes to only one.

#### Caching Layers

To optimize this, we should copy only what is needed for the next immediate step. This means if the next step is `npm install`, we should `COPY` only the `package.json` and `package-lock.json`, and nothing else.

_Dockerfile :_

```dockerfile
# Stage 1
FROM node:latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]
COPY ["index.ts", "tsconfig.json", "./"]
RUN ["npm", "run", "tsc"]
CMD ["node", "./build/index"]
EXPOSE 3000/tcp
```

#### Using ENTRYPOINT and CMD together

Replace `CMD` by `ENTRYPOINT`

#### Using EXPOSE to document exposed ports

```dockerfile
EXPOSE 3000/tcp
```

> **⚠️ Warning :**
>
> Note that the EXPOSE instruction does not publish the port. If the user wishes to publish the port, he/she would have to either:
>
> - use the -p flag on docker run to individually specify each host-to-container port mapping, or
> - use the -P flag to automatically map all exposed container port(s) to an ephemeral high-ordered host port(s)
