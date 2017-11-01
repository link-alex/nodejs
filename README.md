## Repository for node.js homework

# Demo of HomeWork 4:

```
npm i

```

### Tasks 1a - 1i:

To start all 4 servers concurrently:
```
npm run startHttpServers
```
Or:

1. plain text server
```
npm run startPlainTextServer

curl -X GET http://127.0.0.1:3000
```

2. Html server
```
npm run startHtmlServer

curl -X GET http://127.0.0.1:3001
```

3. JSON server
```
npm run startJsonServer

curl -X GET http://127.0.0.1:3002
```

4. Echo server
```
npm run startEchoServer

curl -d 'Message' http://127.0.0.1:3003
```

### Tasks 6-7 Middlewares:

```
npm run start

curl -X GET --cookie "cookieName=cookieValue;name2=v2" http://127.0.0.1:8080/api/products // check server console for parsed cookies (parsing creates an object from cookie string)

curl -X GET http://127.0.0.1:8080/api/users/\?Param1\=VALUE\&SECOND\=1 // check server console for parsed query (parsing makes it lower case)
```

### Task 8 API:

```
npm run start

// Return ALL products
curl -X GET http://127.0.0.1:8080/api/products/

// Return SINGLE product
curl -X GET http://127.0.0.1:8080/api/products/1/
curl -X GET http://127.0.0.1:8080/api/products/2/

// Return ALL reviews for a single product
curl -X GET http://127.0.0.1:8080/api/products/1/reviews
curl -X GET http://127.0.0.1:8080/api/products/2/reviews

// Add NEW product and return it
curl -X POST -d '{"name":"Bike", "brand": "Dike", "price": "1000"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/products
// check All products now
curl -X GET http://127.0.0.1:8080/api/products/

// Return ALL users
curl -X GET http://127.0.0.1:8080/api/users/

```
