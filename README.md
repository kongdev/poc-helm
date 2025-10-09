# MyApp Helm Chart

## การใช้งาน Helm Chart สำหรับแต่ละ Environment

### คำสั่ง Dry Run และ Debug

#### Base Environment (values.yaml)
```bash
helm install myapp-poc ./myapp --dry-run --debug
```

#### Development Environment
```bash
helm install myapp-poc ./myapp -f myapp/values-dev.yaml --dry-run --debug
```

#### UAT Environment
```bash
helm install myapp-poc ./myapp -f myapp/values-uat.yaml --dry-run --debug
```

### การ Deploy จริง

#### Base Environment
```bash
helm install myapp-poc ./myapp -n default
```

### การ ลบ deploy
```bash
helm uninstall myapp-poc
```

#### Development Environment
```bash
helm install myapp-poc ./myapp -f myapp/values-dev.yaml -n default
```

### การ Upgrade

#### Base Environment
```bash
helm upgrade myapp-poc ./myapp
helm upgrade --install myapp-poc ./myapp -n default --reuse-values
```

#### Development Environment
```bash
helm upgrade myapp-poc ./myapp -f myapp/values-dev.yaml
```


#### สร้าง Secret ของเราเอง (ใช้ก่อน install)
```bash
kubectl create secret generic myapp-db-secret \
  --from-literal=postgres-password=kpc2018 \
  --from-literal=postgres-user=kongdev \
  --from-literal=postgres-database=mydb \
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

#### ทดสอบ เชื่อมต่อ postgresql จาก secret ที่สร้าง (ยังเชื่อมต่อไม่ได้หรอก)
```bash
kubectl exec -it myapp-poc-postgresql-0 -- psql -U kongdev -d mydb
```

#### สร้าง user kongdev ก่อน
```bash
kubectl exec myapp-poc-postgresql-0 -- bash -c "PGPASSWORD=kpc2018 psql -U postgres -c \"CREATE USER kongdev WITH PASSWORD 'kpc2018';\""
```

#### สร้าง database mydb
```bash
kubectl exec myapp-poc-postgresql-0 -- bash -c "PGPASSWORD=kpc2018 psql -U postgres -c 'CREATE DATABASE mydb OWNER kongdev;'"
```