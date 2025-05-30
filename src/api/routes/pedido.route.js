const express = require("express");
const router = express.Router();

const {
  createPedido,
  getMisPedidos,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido
} = require("../controller/pedido.controller");

const { isAuth, isAdmin } = require("../../middlewares/auth");

// Usuario: crear pedido
router.post("/", isAuth, createPedido);

// Usuario: ver sus propios pedidos
router.get("/mios", isAuth, getMisPedidos);

// Admin: ver todos los pedidos
router.get("/", isAuth, isAdmin, getAllPedidos);

// Ver un pedido por ID (admin o dueño)
router.get("/:id", isAuth, getPedidoById);

// Actualizar un pedido (admin o dueño)
router.put("/:id", isAuth, updatePedido);

// Eliminar un pedido (admin o dueño)
router.delete("/:id", isAuth, deletePedido);

module.exports = router;
