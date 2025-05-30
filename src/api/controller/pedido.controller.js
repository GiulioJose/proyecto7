const Pedido = require("../models/pedido.model");
const Producto = require("../models/producto.model");

// Crear pedido (usuario)
const createPedido = async (req, res) => {
  try {
    const { productos } = req.body; // Array de objetos: [{ producto, cantidad }]
    const usuario = req.user.id;

    // Validar productos y calcular total
    let total = 0;

    for (const item of productos) {
      const productoBD = await Producto.findById(item.producto);
      if (!productoBD) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.producto}` });
      }
      if (productoBD.stock < item.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para: ${productoBD.nombre}` });
      }
      total += productoBD.precio * item.cantidad;
    }

    // Crear pedido
    const nuevoPedido = new Pedido({
      usuario,
      productos,
      total,
    });

    await nuevoPedido.save();

    // Reducir stock
    for (const item of productos) {
      await Producto.findByIdAndUpdate(
        item.producto,
        { $inc: { stock: -item.cantidad } }
      );
    }

    res.status(201).json({ message: "Pedido creado correctamente", pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ message: "Error al crear pedido", error });
  }
};

// Ver pedidos del usuario
const getMisPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.user.id }).populate("productos.producto");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus pedidos", error });
  }
};

// Ver todos los pedidos (admin)
const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "userName email")
      .populate("productos.producto");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los pedidos", error });
  }
};

// Ver pedido por ID (admin o dueño)
const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id)
      .populate("productos.producto")
      .populate("usuario", "userName email");

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    if (!req.user.admin && pedido.usuario._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para ver este pedido" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedido", error });
  }
};

// Actualizar pedido (admin o dueño)
const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    if (!req.user.admin && pedido.usuario.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para modificar este pedido" });
    }

    const { productos } = req.body;
    if (productos) pedido.productos = productos;

    // Recalcular total
    let total = 0;
    for (const item of productos) {
      const productoBD = await Producto.findById(item.producto);
      if (!productoBD) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.producto}` });
      }
      total += productoBD.precio * item.cantidad;
    }

    pedido.total = total;
    await pedido.save();

    res.status(200).json({ message: "Pedido actualizado correctamente", pedido });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pedido", error });
  }
};

// Eliminar pedido (admin o dueño)
const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    if (!req.user.admin && pedido.usuario.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este pedido" });
    }

    await pedido.deleteOne();
    res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pedido", error });
  }
};

module.exports = {
  createPedido,
  getMisPedidos,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
};
