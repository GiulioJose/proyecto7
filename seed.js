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
    imagen: "https://www.crealo.es/1160697-medium_default/camiseta-la-mas-barata-personalizada-urgente.jpg",
    categoria: "Camisetas"
  },
  {
    nombre: "Taza mágica",
    descripcion: "Taza que cambia de color con líquido caliente",
    precio: 12.5,
    stock: 30,
    imagen: "https://e7.pngegg.com/pngimages/659/518/png-clipart-magic-mug-shiva-sandhya-designer-studio-coffee-cup-coupon-magic-mug-magic-advertising-thumbnail.png",
    categoria: "Tazas"
  },
  {
    nombre: "Poster A3 con marco",
    descripcion: "Poster decorativo con marco negro",
    precio: 24.0,
    stock: 20,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzToM9-9QkUsXVtXvX0WGZeO500R9bCS5VJw&s",
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
