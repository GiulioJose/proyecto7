const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  deleteOwnAccount,
  getAllUsers,
  deleteUserById,
  updateUserRole
} = require("../controller/controllerUser");

const { verifyToken, isAdmin } = require("../middleware/auth");

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Rutas protegidas para usuarios
router.get("/profile", verifyToken, getProfile);
router.delete("/delete", verifyToken, deleteOwnAccount);

// Rutas solo para admin
router.get("/", verifyToken, isAdmin, getAllUsers);
router.delete("/:id", verifyToken, isAdmin, deleteUserById);
router.put("/role/:id", verifyToken, isAdmin, updateUserRole);

module.exports = router;
