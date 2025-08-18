# Test BI Backend

Backend desarrollado con Node.js y Express para conectar con MySQL.

## Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar base de datos
1. Crea una base de datos MySQL llamada `test_bi`
2. Ejecuta el DDL proporcionado para crear las tablas
3. Configura las credenciales en el archivo `.env`

### 3. Configurar variables de entorno
Copia el archivo `.env` y configura:
```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=test_bi
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

## Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Endpoints

### Clientes
- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/clientes/:id` - Obtener cliente por ID
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Órdenes
- `GET /api/ordenes` - Obtener todas las órdenes
- `GET /api/ordenes/:id` - Obtener orden por ID
- `POST /api/ordenes` - Crear nueva orden
- `PUT /api/ordenes/:id` - Actualizar orden
- `DELETE /api/ordenes/:id` - Eliminar orden
- `GET /api/ordenes/cliente/:idCliente` - Obtener órdenes por cliente

### Stored Procedures
- `GET /api/sp/list` - Listar stored procedures disponibles
- `POST /api/sp/call` - Ejecutar stored procedure genérico
- `GET /api/sp/resumen-cliente/:idCliente` - Ejecutar SP de resumen de cliente
- `POST /api/sp/procesar-orden` - Ejecutar SP para procesar orden

### Health Check
- `GET /api/health` - Verificar estado de la API

## Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de MySQL
├── controllers/
│   ├── clienteController.js
│   ├── ordenController.js
│   └── storedProcedureController.js
├── models/
│   ├── Cliente.js
│   ├── Orden.js
│   ├── Operacion.js
│   ├── Tipo.js
│   ├── OrdenOperacion.js
│   ├── OrdenTipo.js
│   └── StoredProcedure.js
├── routes/
│   ├── index.js
│   ├── clientes.js
│   ├── ordenes.js
│   └── storedProcedures.js
├── .env
├── package.json
└── server.js
```

## Ejemplos de Uso

### Crear un cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan Pérez"}'
```

### Crear una orden
```bash
curl -X POST http://localhost:3000/api/ordenes \
  -H "Content-Type: application/json" \
  -d '{"idCliente": 1}'
```

### Llamar stored procedure
```bash
curl -X POST http://localhost:3000/api/sp/call \
  -H "Content-Type: application/json" \
  -d '{"procedureName": "sp_nombre", "params": [1, "parametro"]}'
```
