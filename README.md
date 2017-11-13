## Repository for node.js homework

# Demo of HomeWork 6:

First steps:

 - [Install Docker Community Edition](https://store.docker.com/search?type=edition&offering=community)
 - [Install Docker Compose](https://docs.docker.com/compose/install/)

### Tasks 1 - 2:

Start 2 docker images, one with DB and one with server.
Default docker image with postgres is used.
Sequelize is used for connection to DB.

```
docker-compose up
```

### Tasks 3 - 6:

Run migration to create tables using sequelize cli:

```
node_modules/.bin/sequelize db:migrate
```

Run seeding to fill some data into tables using sequelize cli:

```
node_modules/.bin/sequelize db:seed:all
```

### Tasks 7 - 8:

Correct request to get jwt token (will expire in 1 hour)
```
curl -X POST -d '{"username":"admin", "password": "admin"}' -H "Content-Type: application/json" http://127.0.0.1:8080/auth
```

Use token to get access to products and user - DB is used now!
```
curl -X GET http://127.0.0.1:8080/api/products/?token=PUT_TOKEN_HERE
curl -X GET http://127.0.0.1:8080/api/products/1/?token=PUT_TOKEN_HERE
curl -X GET http://127.0.0.1:8080/api/products/1/reviews/?token=PUT_TOKEN_HERE
curl -X GET http://127.0.0.1:8080/api/users/?token=PUT_TOKEN_HERE
```
