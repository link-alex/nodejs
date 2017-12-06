## Repository for node.js homework

# Demo of HomeWork 7:

First steps:

 - [Install Docker Community Edition](https://store.docker.com/search?type=edition&offering=community)
 - [Install Docker Compose](https://docs.docker.com/compose/install/)

### Tasks 1 - 3:

Start 2 docker images, one with DB and one with server.
Default docker image with postgres is used.
Sequelize is used for connection to DB.

```
npm i
docker-compose up
```

### Task 4:

Write a simple web server which will return a random city on every request

```
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities/random
```

### Task 5-8:

See commit with changes

### Task 9

Add validations for appropriate fields of your models:

See that the following requests fails:

```
curl -X POST -d '{"name":"Vitebsk"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities // no country
curl -X POST -d '{"name":"Minsk","country":"Belarus"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities // already
curl -X POST -d '{"name":"Pinsk","country":"Belarus","lat":"-200"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities // incorrect latitude
```

etc. see full lists in schemas

### Task 10:

Modify application to respond allroutesfrom Homework 4and return data fromthe database

Works with DB:
```
curl -X GET http://127.0.0.1:8080/api/products/

curl -X GET http://127.0.0.1:8080/api/products/1/
curl -X GET http://127.0.0.1:8080/api/products/2/

curl -X GET http://127.0.0.1:8080/api/products/1/reviews
curl -X GET http://127.0.0.1:8080/api/products/2/reviews

curl -X GET http://127.0.0.1:8080/api/users/
```

# Task 11:

Add additional routes and make your application responds on them

```
curl -X DELETE http://127.0.0.1:8080/api/users/2

curl -X DELETE http://127.0.0.1:8080/api/products/2

curl -X GET http://127.0.0.1:8080/api/cities/

curl -X POST -d '{"name":"Pinsk","country":"Belarus"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities

curl -X PUT -d '{"name":"Dzerzhinsk"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities/3

curl -X DELETE http://127.0.0.1:8080/api/cities/3
```

# Task 12:

Implement a function which will add extra field called lastModifiedDate with the current date for every created/updated item (every PUT and POST request for all user, product and city entities)

lastModifiedDate updated via schema hooks
