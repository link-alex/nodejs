## Repository for node.js homework

# Demo of HomeWork 8:

First steps:

 - [Install Docker Community Edition](https://store.docker.com/search?type=edition&offering=community)
 - [Install Docker Compose](https://docs.docker.com/compose/install/)

Start 2 docker images, one with DB and one with swagger server.
Default docker image with mongodb is used.
Mongoose is used for connection to DB.

```
npm i
docker-compose up
```

### Task 1 - 4:

Account and new API were created, documentation covers all required routes with all required information described, API was successfully exported as YAML file:

https://app.swaggerhub.com/apis/nodejshometasksapi/nodejshometasksapi/1.0.0

YAML file could be found in /api/swagger/swagger.yaml

```
curl -X GET -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities/random
```

### Task 5 - 9:

See that the following requests works:

```
# Products

curl -X GET http://127.0.0.1:8080/api/products/

curl -X GET http://127.0.0.1:8080/api/products/1/
curl -X GET http://127.0.0.1:8080/api/products/2/

curl -X GET http://127.0.0.1:8080/api/products/1/reviews
curl -X GET http://127.0.0.1:8080/api/products/2/reviews

curl -X POST -d '{"name":"Ball","brand":"GGG","price":33.33,"reviews":[]}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/products

curl -X DELETE http://127.0.0.1:8080/api/products/0

# Users

curl -X GET http://127.0.0.1:8080/api/users/

curl -X DELETE http://127.0.0.1:8080/api/users/0

# Cities

curl -X GET http://127.0.0.1:8080/api/cities/

curl -X GET http://127.0.0.1:8080/api/cities/random

curl -X POST -d '{"name":"Pinsk","country":"Belarus"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities

curl -X PUT -d '{"name":"Dzerzhinsk","country":"Belarus"}' -H "Content-Type: application/json" http://127.0.0.1:8080/api/cities/2

curl -X DELETE http://127.0.0.1:8080/api/cities/3

```


### Evaluation Criteria
 - 1.Account and new API were created(tasks 1-2).
 - 2.API documentation partially covers some of required routes or contains not all required information(tasks 3).
 - 3.API documentation covers all required routes with all required information described, API was successfully exported as YAML file(task 3-4).
 - 4.Swagger was installed, project was created(tasks5-7).
 - 5.Project server responds on all required endpoints and returns data from the database(task8-9).
