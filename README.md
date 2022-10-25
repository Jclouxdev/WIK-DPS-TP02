# 📝 DevOps WIK-DPS-TP01

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
