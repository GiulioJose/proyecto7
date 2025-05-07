const Libro = require("../models/modelLibros");
const Autor = require("../models/modelAutor");

// Obtener todos los libros
const getLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate("autor");
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los libros",
      error: error.message
    });
  }
};

// Obtener un libro por ID
const getLibroById = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).populate("autor");
    if (!libro) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(400).json({ mensaje: "ID inválido o error al buscar", error });
  }
};

// Crear un nuevo libro
const createLibro = async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    const libroGuardado = await nuevoLibro.save();

    // Agregar el libro al array de libros del autor
    await Autor.findByIdAndUpdate(
      libroGuardado.autor,
      { $addToSet: { libros: libroGuardado._id } } // addToSet evita duplicados
    );

    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el libro", error: error.message });
  }
};

// Actualizar un libro
const updateLibro = async (req, res) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(libroActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el libro", error });
  }
};

// Eliminar un libro
const deleteLibro = async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar el libro", error });
  }
};

// Buscar libros por género
const getLibroByGenero = async (req, res) => {
  try {
    const genero = req.params.genero;
    const libros = await Libro.find({ genero }).populate("autor");
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar por género", error });
  }
};

// Buscar libros por año
const getLibroByAno = async (req, res) => {
  try {
    const ano = parseInt(req.params.ano);
    const libros = await Libro.find({ ano }).populate("autor");
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar por año", error });
  }
};

// Buscar libros por autor
const getLibroByAutor = async (req, res) => {
  try {
    const autorId = req.params.autorId;
    const libros = await Libro.find({ autor: autorId }).populate("autor");
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar por autor", error });
  }
};

// Buscar libros por idioma
const getLibroByIdioma = async (req, res) => {
  try {
    const idioma = req.params.idioma;
    const libros = await Libro.find({ idiomas: idioma }).populate("autor");
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar por idioma", error });
  }
};

module.exports = {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
  getLibroByGenero,
  getLibroByAno,
  getLibroByAutor,
  getLibroByIdioma
};
