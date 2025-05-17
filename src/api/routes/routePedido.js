const express = require("express");
const router = express.Router();

const {
  createPedido,
  getMisPedidos,
  getAllPedidos
} = require("../controller/controllerPedido");

const { verifyToken, isAdmin } = require("../middleware/auth");

// Usuario: crear pedido
router.post("/", verifyToken, createPedido);

// Usuario: ver sus propios pedidos
router.get("/mios", verifyToken, getMisPedidos);

// Admin: ver todos los pedidos
router.get("/", verifyToken, isAdmin, getAllPedidos);

module.exports = router;
