## Intergrate Envoy proxy with OPA call backend service

```sh
  - run docker-compose up -d --build
```
### Check with token

```js
  - export GUEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QiLCJzdWIiOiJZV3hwWTJVPSIsIm5iZiI6MTUxNDg1MTEzOSwiZXhwIjoxNjQxMDgxNTM5fQ.VUsqwMR46q74tYu8DlzqfmcN9GXrPe5NtWsd0nf7N_o"
  
  - export ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJZbTlpIiwibmJmIjoxNTE0ODUxMTM5LCJleHAiOjE2NDEwODE1Mzl9.IwRIjAvPwV1IuUoDVc0elP9bUquErxLcpYVPMe0-qZU"
```

- user-service with localhost:8081/user
- product-service with localhost:8082/product
- server-envoy with localhost:8000

#### Check token guest can call product service and not call user-service

```sh
  - curl -s -H "Authorization: Bearer "$GUEST_TOKEN"" http://localhost:8000/user
  - curl -s -H "Authorization: Bearer "$GUEST_TOKEN"" http://localhost:8000/product 
```

#### Check token admin can call product service and call user-service and create user

```sh
  - curl -s -H "Authorization: Bearer "$ADMIN_TOKEN"" http://localhost:8000/user
  - curl -s -H "Authorization: Bearer "$ADMIN_TOKEN"" http://localhost:8000/product 
  - curl --request POST \
    --url http://localhost:8000/user \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJZbTlpIiwibmJmIjoxNTE0ODUxMTM5LCJleHAiOjE2NDEwODE1Mzl9.IwRIjAvPwV1IuUoDVc0elP9bUquErxLcpYVPMe0-qZU' \
    --data '{
	    "firstname": "Hello",
      "lastname": "Word"
    }'
```
