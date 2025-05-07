const express = require("express");
const router = express.Router();

const {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
} = require("../controller/controllerAutor");

// Obtener todos los autores
router.get("/", getAutores);

// Obtener un autor por ID
router.get("/:id", getAutorById);

// Crear un nuevo autor
router.post("/", createAutor);

// Actualizar un autor
router.put("/:id", updateAutor);

// Eliminar un autor
router.delete("/:id", deleteAutor);

module.exports = router;
