const mongoose = require("mongoose");

const librosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ano: { type: Number, required: true },
  idiomas: { type: [String], required: true },
  genero: {
    type: String,
    required: true,
    enum: [
      "Política", "Drama", "Economía", "Fantasía", "Ciencia ficción", "Biografía",
      "Historia", "Tecnología", "Misterio", "Aventura", "Romance", "Terror", "Autoayuda",
      "Educativo", "Infantil"
    ]
  },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "Autor", required: true }
}, {
  timestamps: true,
  collection: "libros"
});

const Libro = mongoose.model("Libro", librosSchema);
module.exports = Libro;

