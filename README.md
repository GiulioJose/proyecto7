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
JWT_SECRET=palabraSuperSecreta
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
├── src/
│   ├── api/
│   │   ├── controller/
│   │   │   ├── controllerUsers.js
│   │   │   ├── controllerProducto.js
│   │   │   └── controllerPedido.js
│   │   ├── models/
│   │   │   ├── modelUser.js
│   │   │   ├── modelProducto.js
│   │   │   └── modelPedido.js
│   │   ├── routes/
│   │   │   ├── routeUsers.js
│   │   │   ├── routeProducto.js
│   │   │   └── routePedido.js
│
│   ├── middlewares/
│   │   └── auth.js
│
│   ├── config/
│   │   ├── db.js
│   │   └── jwt.js
│
├── .env
├── index.js
├── seed.js
├── package.json
├── README.md
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

## 📡 Endpoints

### Auth y Usuarios

| Método | Ruta                | Acceso | Descripción                        |
|--------|---------------------|--------|------------------------------------|
| POST   | /api/users/register | Público| Registro (rol user por defecto)   |
| POST   | /api/users/login    | Público| Login y devuelve token            |
| GET    | /api/users/profile  | User   | Ver perfil                        |
| DELETE | /api/users/delete   | User   | Eliminar su propia cuenta         |
| GET    | /api/users/         | Admin  | Ver todos los usuarios            |
| DELETE | /api/users/:id      | Admin  | Eliminar un usuario               |
| PUT    | /api/users/role/:id | Admin  | Cambiar rol de un usuario         |

---

### Productos

| Método | Ruta                  | Acceso  | Descripción             |
|--------|-----------------------|---------|-------------------------|
| GET    | /api/productos        | Público | Ver todos los productos |
| GET    | /api/productos/:id    | Público | Ver un producto         |
| POST   | /api/productos        | Admin   | Crear producto          |
| PUT    | /api/productos/:id    | Admin   | Actualizar producto     |
| DELETE | /api/productos/:id    | Admin   | Eliminar producto       |

---

### Pedidos

| Método | Ruta                 | Acceso | Descripción             |
|--------|----------------------|--------|-------------------------|
| POST   | /api/pedidos         | User   | Crear un nuevo pedido   |
| GET    | /api/pedidos/mios    | User   | Ver mis pedidos         |
| GET    | /api/pedidos         | Admin  | Ver todos los pedidos   |

---

## 🔒 Roles y permisos

- Usuarios se crean con rol `user` por defecto  
- Un `admin` puede cambiar el rol de otros  
- `isAuth` y `isAdmin` son middlewares que protegen las rutas

El primer admin se debe crear manualmente desde la base de datos.

---

## 👤 Autor

Giulio Spaziani

---

## 📝 Licencia

MIT
