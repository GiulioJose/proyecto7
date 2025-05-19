const express = require("express");
const router = express.Router();

const {
  createPedido,
  getMisPedidos,
  getAllPedidos
} = require("../controller/controllerPedido");

const { isAuth, isAdmin } = require("../../middlewares/auth");

// Usuario: crear pedido
router.post("/", isAuth, createPedido);

// Usuario: ver sus propios pedidos
router.get("/mios", isAuth, getMisPedidos);

// Admin: ver todos los pedidos
router.get("/", isAuth, isAdmin, getAllPedidos);

module.exports = router;
