# MyApp Helm Chart

## การใช้งาน Helm Chart สำหรับแต่ละ Environment

### คำสั่ง Dry Run และ Debug

#### Base Environment (values.yaml)
```bash
helm install myapp ./myapp --dry-run --debug
```

#### Development Environment
```bash
helm install myapp ./myapp -f myapp/values-dev.yaml --dry-run --debug
```

#### UAT Environment
```bash
helm install myapp ./myapp -f myapp/values-uat.yaml --dry-run --debug
```

### การ Deploy จริง

#### Base Environment
```bash
helm install myapp-poc ./myapp -n default
```

#### Development Environment
```bash
helm install myapp-poc ./myapp -f myapp/values-dev.yaml -n default
```

#### UAT Environment
```bash
helm install myapp-poc ./myapp -f myapp/values-uat.yaml -n default
```

### การ ลบ deploy
```bash
helm uninstall myapp-poc -n default
```

### ค่า Configuration แต่ละ Environment

- **Base**: `myvalue: "Hello from BASE environment"`
- **Dev**: `myvalue: "Hello from DEV environment"`
- **UAT**: `myvalue: "Hello from UAT environment"`