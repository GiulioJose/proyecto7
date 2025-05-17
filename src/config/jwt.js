const jwt = require("jsonwebtoken");

// esta función me sirve para generar la LLAVE (token)
const generateSign = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1y" }
  );
};

// esta función me sirve para comprobar si la llave la hemos hecho nosotros
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateSign, verifyJwt }