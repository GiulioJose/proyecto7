const Autor = require("../models/modelAutor");
const Libro = require("../models/modelLibros");

// Obtener todos los autores
const getAutores = async (req, res) => {
  try {
    const autores = await Autor.find().populate("libros");
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener autores", error: error.message });
  }
};

// Obtener un autor por ID
const getAutorById = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id).populate("libros");
    if (!autor) {
      return res.status(404).json({ mensaje: "Autor no encontrado" });
    }
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al buscar autor", error: error.message });
  }
};

// Crear autor
const createAutor = async (req, res) => {
  try {
    const nuevoAutor = new Autor(req.body);
    const autorGuardado = await nuevoAutor.save();
    res.status(201).json(autorGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear autor", error: error.message });
  }
};

// Actualizar autor
const updateAutor = async (req, res) => {
  try {
    const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(autorActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar autor", error: error.message });
  }
};

// Eliminar autor
const deleteAutor = async (req, res) => {
  try {
    // 1. Eliminar todos los libros asociados al autor
    await Libro.deleteMany({ autor: req.params.id });

    // 2. Eliminar el autor
    await Autor.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensaje: "Autor y libros eliminados correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar autor y sus libros", error: error.message });
  }
};

module.exports = {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
};
