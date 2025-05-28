const express = require("express");
const router = express.Router();

// ✅ Importamos los controladores con sus nombres reales
const {
  registerUser,
  loginUser,
  getProfile,
  deleteOwnAccount,
  getAllUsers,
  deleteUserById,
  updateUserRole
} = require("../controller/user.controller");

const { isAuth, isAdmin } = require("../../middlewares/auth");

// Rutas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rutas protegidas para usuarios
router.get("/profile", isAuth, getProfile);
router.delete("/delete", isAuth, deleteOwnAccount);

// Rutas solo para admin
router.get("/", isAuth, isAdmin, getAllUsers);
router.delete("/:id", isAuth, isAdmin, deleteUserById);
router.put("/role/:id", isAuth, isAdmin, updateUserRole);

module.exports = router;
