# MyApp Helm Chart

### คำสั่ง Dry Run และ Debug


### การ debug template
```bash
helm template myapp-poc ./myapp -f myapp/values-dev.yaml -n default --dry-run --debug
```

### การ Upgrade

```bash
helm upgrade --install myapp-poc ./myapp -f values.yaml -n default
```

### การ ลบ deploy
```bash
helm uninstall myapp-poc
```

### การ diff helm
```bash
helm diff upgrade  myapp-poc ./myapp -f myapp/values.yaml -n default
```

#### สร้าง Secret ของเราเอง (ใช้ก่อน install)
```bash
kubectl create secret generic myapp-db-secret \
  --from-literal=postgres-password=kpc2018 \
  --from-literal=postgres-app-password=kpc2018 \
  -n default
```

#### เช็ค secret:
```bash
kubectl get secret myapp-db-secret -o yaml
```

#### ลบ secret:
```bash
kubectl delete secrets myapp-db-secret
```

#### ทดสอบ node + pg (local)
```bash
docker build -t poc-helm-node-pg:v1.1.0 .
docker run -p 3003:3000 poc-helm-node-pg:v1.1.0
```

#### Load Docker image เข้า minikube
```bash
minikube image load poc-helm-node-pg:v1.1.0
```

#### เช็ค images ใน minikube
```bash
minikube image ls
```
