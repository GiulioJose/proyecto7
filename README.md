# 🛍️ Tienda de Productos Personalizados (Proyecto 7)

Este proyecto es una API REST para una tienda de productos personalizados, desarrollada con Node.js, Express y MongoDB Atlas. Incluye autenticación con JWT, control de roles y relaciones entre usuarios, productos y pedidos.

---

## 🔧 Instalación

1. Clona el repositorio  
2. Instala las dependencias:

```bash
npm install
```

3. Inserta productos y usuarios de ejemplo:

```bash
node seed.js
```

4. Levanta el servidor:

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
├── .gitignore
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
│       │   ├── user.model.js
│       │   ├── producto.model.js
│       │   └── pedido.model.js
│       │
│       ├── controller/
│       │   ├── user.controller.js
│       │   ├── producto.controller.js
│       │   └── pedido.controller.js
│       │
│       └── routes/
│           ├── user.routes.js
│           ├── producto.routes.js
│           └── pedido.routes.js
```

---

## 🧩 Modelos

- **User**  
  - `userName`, `email`, `password`, `rol`  
  - Relaciones: puede tener múltiples pedidos

- **Producto**  
  - `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `categoria`

- **Pedido**  
  - `usuario` (ref a User)  
  - `productos` (array de objetos: producto + cantidad)  
  - `total`, `estado` (opcional)

---

## 📡 Endpoints principales

### 🔐 Usuarios

| Método | Ruta                        | Acceso     | Descripción                                      |
|--------|-----------------------------|------------|--------------------------------------------------|
| POST   | /api/users/register         | Público    | Registro de usuarios (rol = user)               |
| POST   | /api/users/login            | Público    | Login y devuelve token JWT                      |
| GET    | /api/users/profile          | User       | Ver perfil propio (por token)                   |
| GET    | /api/users/profile/:id      | Admin      | Ver perfil por ID                               |
| PUT    | /api/users/edit             | User       | Editar nombre o email del perfil propio         |
| DELETE | /api/users/delete           | User       | Eliminar su propia cuenta                       |
| GET    | /api/users/                 | Admin      | Ver todos los usuarios                          |
| PUT    | /api/users/role/:id         | Admin      | Cambiar rol de un usuario                       |
| DELETE | /api/users/:id              | Admin      | Eliminar otro usuario                           |

### 🛍️ Productos

| Método | Ruta               | Acceso | Descripción                 |
|--------|--------------------|--------|-----------------------------|
| GET    | /api/productos     | Público| Ver todos los productos     |
| GET    | /api/productos/:id | Público| Ver producto por ID         |
| POST   | /api/productos     | Admin  | Crear nuevo producto        |
| PUT    | /api/productos/:id | Admin  | Actualizar producto         |
| DELETE | /api/productos/:id | Admin  | Eliminar producto           |

### 📦 Pedidos

| Método | Ruta                     | Acceso     | Descripción                                      |
|--------|--------------------------|------------|--------------------------------------------------|
| POST   | /api/pedidos             | User       | Crear un nuevo pedido                            |
| GET    | /api/pedidos/mios        | User       | Ver los pedidos del usuario logueado             |
| GET    | /api/pedidos             | Admin      | Ver todos los pedidos                            |
| GET    | /api/pedidos/:id         | Admin/User | Ver pedido por ID (solo el dueño o admin)        |
| PUT    | /api/pedidos/:id         | Admin/User | Actualizar pedido (solo el dueño o admin)        |
| DELETE | /api/pedidos/:id         | Admin/User | Eliminar pedido (solo el dueño o admin)          |

---

## 🔒 Roles y seguridad

- Los usuarios se registran siempre con rol `user`
- Solo un admin (creado manualmente en el seed) puede:
  - Ver todos los usuarios
  - Cambiar roles
  - Eliminar usuarios
  - Crear, editar y eliminar productos
  - Ver y modificar cualquier pedido
- Middleware `isAuth` protege rutas privadas
- Middleware `isAdmin` restringe rutas a admin

---

## 👥 Usuarios de prueba (seed)

| Nombre  | Email              | Contraseña |
|---------|--------------------|------------|
| admin   | admin@example.com  | 123456     |
| Carlos  | carlos@example.com | 123456     |
| Laura   | laura@example.com  | 123456     |
| Elena   | elena@example.com  | 123456     |

---

## 👤 Autor

Giulio Spaziani