# 📚 API REST - Biblioteca Online

Este proyecto es una API REST desarrollada con **Node.js**, **Express** y **MongoDB Atlas**. Permite gestionar una biblioteca de libros y autores con relaciones entre ellos.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* dotenv
* nodemon

---

## 🌍 Conexión a la Base de Datos

La conexión se realiza mediante un archivo `.env`:

```
DB_URL=mongodb+srv://user1:********@cluster0.bctvjs8.mongodb.net/libreria?retryWrites=true&w=majority&appName=Cluster0
```

⚠️ Asegúrate de que la IP pública `0.0.0.0/0` esté habilitada en MongoDB Atlas.

---

## 🧪 Semilla (Seed)

Este proyecto incluye un archivo `seed.js` que limpia la base de datos y carga autores y libros de prueba.

Ejecutá el seed con:

```bash
node seed.js
```

---

## 📁 Estructura del proyecto

```
proyecto/
│
├── src/
│   ├── api/
│   │   ├── controller/
│   │   │   ├── controllerLibros.js
│   │   │   └── controllerAutor.js
│   │   ├── models/
│   │   │   ├── modelLibros.js
│   │   │   └── modelAutor.js
│   │   └── routes/
│   │       ├── routeLibro.js
│   │       └── routeAutor.js
│   └── config/
│       └── db.js
│
├── .env
├── index.js
├── seed.js
└── README.md
```

---

## 📌 Funcionalidades principales

* CRUD completo de **Libros**
* CRUD completo de **Autores**
* Relación entre modelos con `populate()`
* Al eliminar un autor, se eliminan también sus libros
* Evita duplicados en los arrays relacionados con `$addToSet`
* Búsquedas personalizadas por género, idioma, año y autor

---

## 📚 Endpoints disponibles

### Libros (`/libros`)

| Método | Ruta                     | Descripción                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/libros`                | Obtener todos los libros   |
| GET    | `/libros/:id`            | Obtener un libro por su ID |
| POST   | `/libros`                | Crear un nuevo libro       |
| PUT    | `/libros/:id`            | Actualizar un libro        |
| DELETE | `/libros/:id`            | Eliminar un libro          |
| GET    | `/libros/genero/:genero` | Buscar libros por género   |
| GET    | `/libros/ano/:ano`       | Buscar libros por año      |
| GET    | `/libros/autor/:autorId` | Buscar libros por autor    |
| GET    | `/libros/idioma/:idioma` | Buscar libros por idioma   |

---

### Autores (`/autores`)

| Método | Ruta           | Descripción                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/autores`     | Obtener todos los autores      |
| GET    | `/autores/:id` | Obtener un autor por su ID     |
| POST   | `/autores`     | Crear un nuevo autor           |
| PUT    | `/autores/:id` | Actualizar un autor            |
| DELETE | `/autores/:id` | Eliminar un autor y sus libros |

---

## 🔗 Repositorio

🔓 [Enlace al repositorio público en GitHub](https://github.com/GiulioJose/proyecto6.git)

---

## 👤 Autor

\*\*Giulio José Spaziani \*\*
