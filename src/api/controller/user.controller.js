const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");

// ✅ Crear nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({ ...req.body, password, rol: "user" });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login exitoso",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Obtener perfil del usuario autenticado
const getProfile = (req, res) => {
  res.status(200).json({
    message: "Perfil del usuario",
    user: req.user,
  });
};

// ✅ Eliminar la propia cuenta
const deleteOwnAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Obtener todos los usuarios (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Eliminar un usuario por ID (admin)
const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Modificar el rol de un usuario (admin)
const updateUserRole = async (req, res) => {
  try {
    const { rol } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { rol }, { new: true });
    res.status(200).json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  deleteOwnAccount,
  getAllUsers,
  deleteUserById,
  updateUserRole,
};
