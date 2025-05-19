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
} = require("../controller/controllerUsers");

const { isAuth, isAdmin } = require("../../middlewares/auth");

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Rutas protegidas para usuarios
router.get("/profile", isAuth, getProfile);
router.delete("/delete", isAuth, deleteOwnAccount);

// Rutas solo para admin
router.get("/", isAuth, isAdmin, getAllUsers);
router.delete("/:id", isAuth, isAdmin, deleteUserById);
router.put("/role/:id", isAuth, isAdmin, updateUserRole);

module.exports = router;
