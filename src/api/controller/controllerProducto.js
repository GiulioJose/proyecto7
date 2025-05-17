const Producto = require("../models/modelProducto");

// Obtener todos los productos
const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los productos", error });
  }
};

// Obtener producto por ID
const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: "ID inválido o error al buscar", error });
  }
};

// Crear producto (admin)
const createProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el producto", error: error.message });
  }
};

// Actualizar producto (admin)
const updateProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el producto", error });
  }
};

// Eliminar producto (admin)
const deleteProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar el producto", error });
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
