const mongoose = require("mongoose");

const autorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  pais: { type: String, required: true },
  libros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Libro" }]
}, {
  timestamps: true,
  collection: "autores"
});

module.exports = mongoose.model("Autor", autorSchema);
