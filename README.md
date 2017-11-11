## Repository for node.js homework

# Demo of HomeWork 5:

```
npm i
npm start

```

### Tasks 1 - 3:

Incorrect username or password to check error
```
curl -X POST -d '{"username":"admin", "password": "adminilinet"}' -H "Content-Type: application/json" http://127.0.0.1:8080/auth
```

Correct request to get jwt token (will expire in 1 min)
```
curl -X POST -d '{"username":"admin", "password": "admin"}' -H "Content-Type: application/json" http://127.0.0.1:8080/auth
```

Use token to get access to products and user
```
curl -X GET http://127.0.0.1:8080/api/products/?token=PUT_TOKEN_HERE
curl -X GET http://127.0.0.1:8080/api/users/?token=PUT_TOKEN_HERE
```

### Tasks 4 - 6:

Local Strategy to log in using hardcoded credentials
```
curl -X POST -d '{"username":"admin", "password": "admin"}' -H "Content-Type: application/json" http://127.0.0.1:8080/passport/local
```

To test other Strategies, open in browser and login into:

 - Facebook: http://localhost:8080/passport/fb
 - Twitter:  http://localhost:8080/passport/twitter
 - Google:   http://localhost:8080/passport/google

 You will be able to login.

 To check that authorization is valid you can use the access token from previous step (Facebook example here only!)

```
curl --header "Authorization: PUT_TOKEN_HERE" --request GET localhost:8080/api/users
curl --header "Authorization: PUT_TOKEN_HERE" --request GET localhost:8080/api/products
```    
