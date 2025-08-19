# Test BI Frontend

Frontend desarrollado con React y Next.js para gestión de clientes.

## Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Verificar backend
Asegúrate de que el backend esté ejecutándose en `http://localhost:9000`

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

El frontend estará disponible en: http://localhost:3000

## Funcionalidades

### ✅ Crear Cliente
- Formulario para crear nuevos clientes
- Endpoint: `POST /api/sp/crear-editar-cliente`
- Payload: `{ "idCliente": null, "nombre": "Nombre Cliente" }`

### ✅ Editar Cliente
- Edición en línea desde la lista de clientes
- Endpoint: `POST /api/sp/crear-editar-cliente`
- Payload: `{ "idCliente": 123, "nombre": "Nuevo Nombre" }`

### ✅ Eliminar Cliente
- Eliminación con confirmación
- Endpoint: `POST /api/sp/eliminar-cliente`
- Payload: `{ "idCliente": 123 }`

### ✅ Listar Clientes
- Lista todos los clientes existentes
- Endpoint: `GET /api/clientes` (endpoint regular para consulta)

## Estructura del Proyecto

```
frontend/
├── components/
│   ├── ClienteForm.js       # Formulario crear/editar
│   └── ClientesList.js      # Lista y eliminación
├── pages/
│   ├── _app.js             # Configuración global
│   ├── _document.js        # Document HTML
│   └── index.js            # Página principal
├── services/
│   └── api.js              # Servicio API con axios
├── styles/
│   └── globals.css         # Estilos globales
├── next.config.js          # Configuración Next.js
└── package.json
```

## Tecnologías

- **React 18** - Biblioteca de UI
- **Next.js 14** - Framework React
- **Axios** - Cliente HTTP
- **CSS Vanilla** - Estilos (sin librerías externas)

## Scripts

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build para producción
npm run start    # Ejecutar build de producción
npm run lint     # Verificar código
```

## Endpoints Backend

El frontend utiliza estos endpoints específicos:

1. **Crear/Editar Cliente**
   ```
   POST localhost:9000/api/sp/crear-editar-cliente
   {
     "idCliente": null,        // null para crear, ID para editar
     "nombre": "Juan332"
   }
   ```

2. **Eliminar Cliente**
   ```
   POST localhost:9000/api/sp/eliminar-cliente
   {
     "idCliente": 1
   }
   ```

## Características

- ✅ Responsive design
- ✅ Validación de formularios
- ✅ Manejo de errores
- ✅ Loading states
- ✅ Confirmación de eliminación
- ✅ Edición en línea
- ✅ Mensajes de éxito/error
- ✅ Reconexión automática
