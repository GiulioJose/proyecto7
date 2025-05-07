const express = require("express");
const router = express.Router();

const {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
  getLibroByGenero,
  getLibroByAno,
  getLibroByAutor,
  getLibroByIdioma
} = require("../controller/controllerLibros");

// Buscar libros por género
router.get("/genero/:genero", getLibroByGenero);

// Buscar libros por año
router.get("/ano/:ano", getLibroByAno);

// Buscar libros por autor
router.get("/autor/:autorId", getLibroByAutor);

// Buscar libros por idioma
router.get("/idioma/:idioma", getLibroByIdioma);

// Obtener todos los libros
router.get("/", getLibros);

// Obtener un libro por ID (esto va al final)
router.get("/:id", getLibroById);

// Crear un nuevo libro
router.post("/", createLibro);

// Actualizar un libro
router.put("/:id", updateLibro);

// Eliminar un libro
router.delete("/:id", deleteLibro);

module.exports = router;
