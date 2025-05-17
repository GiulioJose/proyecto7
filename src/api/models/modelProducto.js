const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String }, // URL de imagen opcional
    categoria: {
      type: String,
      required: true,
      enum: [
        "Camisetas", "Tazas", "Posters", "Pegatinas", "Libretas",
        "Tecnología", "Hogar", "Accesorios", "Otros"
      ]
    }
  },
  {
    timestamps: true,
    collection: "productos"
  }
);

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;