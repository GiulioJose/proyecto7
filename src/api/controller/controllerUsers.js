const User = require("../models/modelUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Utilidad para generar token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Registro
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Ya existe ese email" });

    const newUser = new User({ userName, email, password }); // rol = user por defecto
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user._id, userName: user.userName, rol: user.rol } });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el login", error: error.message });
  }
  
};

// Ver perfil propio
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};

// Eliminarse a sí mismo
const deleteOwnAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Cuenta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cuenta", error });
  }
};

// Ver todos los usuarios (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Eliminar usuario por ID (admin)
const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};

// Cambiar rol de un usuario (admin)
const updateUserRole = async (req, res) => {
  try {
    const { rol } = req.body;
    if (!["user", "admin"].includes(rol)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { rol }, { new: true });
    res.status(200).json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar rol", error });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  deleteOwnAccount,
  getAllUsers,
  deleteUserById,
  updateUserRole,
};
