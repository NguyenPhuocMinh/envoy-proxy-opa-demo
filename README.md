## Intergrate Envoy proxy with OPA call backend service

### Structure

```sh
.
├── README.md
├── backend
├── frontend
├── config
│   └── opa-polices
│       └── policy.rego
├── docker-compose.yml
├── envoy
│   ├── Dockerfile
│   ├── envoy-v3.yaml
│   └── run_envoy.sh
└── users.json
```

### Run build with docker-compose
```sh
  - run docker-compose up -d --build
```

### Run down with docker-compose
```sh
  - run docker-compose down
```

### Run with k8s
```sh
  - minikube start
  - alias k = "kubectl"
  - k apply -f k8s/configmap.yaml
  - k apply -f k8s/secret.yaml
  - k apply -f k8s/deployment.yaml
  - k apply -f k8s/service.yaml
  - expose service external_ip minikube tunnel
  => check k get configmap
  => check k get secret
  => check k get pods
  => check k get describe pod name_pod
```

### Run with helm chart
```sh
  - minikube start
  - alias k = "kubectl"
  - helm install RELEASE_NAME helm-chart-envoy-opa
  => check helm valid: helm template helm-chart-envoy-opa
  => check helm list
  => check k get all
  => check k get configmap
  => check k get secret
  => check k get pods
  - uninstall helm => helm uninstall RELEASE_NAME
```
### Check with token

- [Check token with jwt.io](https://jwt.io/)

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

#### Check input opa file

- [Check file OPA](https://play.openpolicyagent.org/)

```sh
  - docker logs opa-service
```
