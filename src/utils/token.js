const jwt = require("jsonwebtoken");

// Genera el token (JWT) para un usuario
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1y" }
  );
};

// Verifica si el token es válido y fue emitido por nosotros
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyJwt };
