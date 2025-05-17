const express = require("express");
const router = express.Router();

const {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require("../controller/controllerProducto");

const { isAuth, isAdmin } = require("../../middleware/auth");

// Público
router.get("/", getAllProductos);
router.get("/:id", getProductoById);

// Solo admin
router.post("/", isAuth, isAdmin, createProducto);
router.put("/:id", isAuth, isAdmin, updateProducto);
router.delete("/:id", isAuth, isAdmin, deleteProducto);

module.exports = router;
