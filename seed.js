require("dotenv").config();
const mongoose = require("mongoose");
const { connectBD } = require("./src/config/db");
const Producto = require("./src/api/models/modelProducto");

const productos = [
  {
    nombre: "Camiseta personalizada",
    descripcion: "Camiseta 100% algodón con diseño personalizado",
    precio: 19.99,
    stock: 50,
    imagen: "https://example.com/camiseta.jpg",
    categoria: "Camisetas"
  },
  {
    nombre: "Taza mágica",
    descripcion: "Taza que cambia de color con líquido caliente",
    precio: 12.5,
    stock: 30,
    imagen: "https://example.com/taza.jpg",
    categoria: "Tazas"
  },
  {
    nombre: "Poster A3 con marco",
    descripcion: "Poster decorativo con marco negro",
    precio: 24.0,
    stock: 20,
    imagen: "https://example.com/poster.jpg",
    categoria: "Posters"
  }
];

const seed = async () => {
  try {
    await connectBD();
    await Producto.deleteMany(); // Borra productos existentes
    await Producto.insertMany(productos);
    console.log("✅ Productos insertados correctamente");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error en la semilla:", error);
  }
};

seed();
