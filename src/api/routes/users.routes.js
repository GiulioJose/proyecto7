const express = require("express");
const router = express.Router();

// ✅ Importamos los controladores
const {
  registerUser,
  loginUser,
  getProfile,
  getProfileById,
  editOwnProfile,
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
router.get("/profile", isAuth, getProfile); // Perfil propio (token)
router.get("/profile/:id", isAuth, getProfileById); // Perfil propio o admin
router.put("/edit", isAuth, editOwnProfile); // Editar perfil propio
router.delete("/delete", isAuth, deleteOwnAccount);

// Rutas solo para admin
router.get("/", isAuth, isAdmin, getAllUsers);
router.delete("/:id", isAuth, isAdmin, deleteUserById);
router.put("/role/:id", isAuth, isAdmin, updateUserRole);

module.exports = router;
