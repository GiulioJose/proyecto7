# 🛍️ Tienda de Productos Personalizados (Proyecto 7)

Este proyecto es una API REST para una tienda de productos personalizados, desarrollada con Node.js, Express y MongoDB Atlas. Incluye autenticación con JWT, control de roles y relaciones entre usuarios, productos y pedidos.

---

## 🔧 Instalación

1. Clona el repositorio  
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con:

```env
DB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/tiendaDB
JWT_SECRET=proyecto7SecretKey_XYZ
```

4. Inserta productos de ejemplo:

```bash
node seed.js
```

5. Levanta el servidor:

```bash
node index.js
```

---

## 🗂️ Estructura del proyecto

```
proyecto7/
│
├── index.js
├── seed.js
├── .env
├── package.json
├── README.md
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── jwt.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   └── api/
│       ├── models/
│       │   ├── modelUser.js
│       │   ├── modelProducto.js
│       │   └── modelPedido.js
│       │
│       ├── controller/
│       │   ├── controllerUsers.js
│       │   ├── controllerProducto.js
│       │   └── controllerPedido.js
│       │
│       └── routes/
│           ├── routeUsers.js
│           ├── routeProducto.js
│           └── routePedido.js
```

---

## 🧩 Modelos

- **User**  
  - `userName`, `email`, `password`, `rol`  
  - Relaciones: puede tener múltiples pedidos

- **Producto**  
  - `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `categoría`

- **Pedido**  
  - `usuario` (ref a User)  
  - `productos` (array de refs a Producto + cantidad)  
  - `total`, `estado`

---

## 📡 Endpoints principales

### 🔐 Auth y Usuarios

| Método | Ruta                | Acceso  | Descripción                           |
|--------|---------------------|---------|---------------------------------------|
| POST   | /api/users/register | Público | Registro de usuarios (rol = user)     |
| POST   | /api/users/login    | Público | Login y devuelve token JWT            |
| GET    | /api/users/profile  | User    | Ver perfil propio                     |
| DELETE | /api/users/delete   | User    | Eliminar su propia cuenta             |
| GET    | /api/users/         | Admin   | Ver todos los usuarios                |
| PUT    | /api/users/role/:id | Admin   | Cambiar rol de un usuario             |
| DELETE | /api/users/:id      | Admin   | Eliminar otro usuario                 |

### 🛍️ Productos

| Método | Ruta               | Acceso  | Descripción                           |
|--------|--------------------|---------|---------------------------------------|
| GET    | /api/productos     | Público | Ver todos los productos               |
| POST   | /api/productos     | Admin   | Crear nuevo producto                  |
| PUT    | /api/productos/:id | Admin   | Actualizar producto                   |
| DELETE | /api/productos/:id | Admin   | Eliminar producto                     |

### 📦 Pedidos

| Método | Ruta                 | Acceso | Descripción                           |
|--------|----------------------|--------|---------------------------------------|
| POST   | /api/pedidos         | User   | Crear un nuevo pedido                 |
| GET    | /api/pedidos/mios    | User   | Ver los pedidos del usuario logueado |
| GET    | /api/pedidos         | Admin  | Ver todos los pedidos                 |

---

## 🔒 Roles y seguridad

- Los usuarios se registran siempre con rol `user`
- Solo un `admin` (creado manualmente) puede:
  - Ver todos los usuarios
  - Cambiar roles
  - Eliminar usuarios
- Middleware `isAuth` protege rutas privadas
- Middleware `isAdmin` restringe rutas a admin

---

## 🔗 Repositorio

[🔗 GitHub: GiulioJose/proyecto7](https://github.com/GiulioJose/proyecto7)

---

## 📸 Capturas (opcional)

Puedes añadir capturas aquí si tienes frontend:

```md
![Vista de productos](./capturas/productos.png)
```

---

## 👤 Autor

Giulio Spaziani

---

## 📝 Licencia

MIT
