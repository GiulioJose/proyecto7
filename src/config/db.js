const mongoose = require("mongoose");

const connectBD = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado con exito a la BBDD");
  } catch (error) {
    console.log("Algo ha salido mal:", error.message);
  }
}

module.exports = { connectBD };