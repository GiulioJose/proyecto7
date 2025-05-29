require("dotenv").config();
const mongoose = require("mongoose");
const { connectBD } = require("./src/config/db");
const Producto = require("./src/api/models/producto.model");
const User = require("./src/api/models/user.model");
const bcrypt = require("bcrypt");

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
  },
  {
    nombre: "Pegatina divertida",
    descripcion: "Pegatina resistente al agua y sol",
    precio: 3.99,
    stock: 100,
    imagen: "https://cdn-icons-png.flaticon.com/512/1057/1057196.png",
    categoria: "Pegatinas"
  },
  {
    nombre: "Libreta personalizada",
    descripcion: "Libreta con tapa dura y diseño único",
    precio: 9.5,
    stock: 40,
    imagen: "https://www.printsome.com/blog/wp-content/uploads/2020/03/custom-notebook.jpg",
    categoria: "Libretas"
  },
  {
    nombre: "Funda para móvil",
    descripcion: "Funda con diseño impreso a medida",
    precio: 15.0,
    stock: 60,
    imagen: "https://cdn.pixabay.com/photo/2018/01/20/07/38/phone-3097447_960_720.jpg",
    categoria: "Tecnología"
  },
  {
    nombre: "Cojín decorativo",
    descripcion: "Cojín suave con estampado personalizado",
    precio: 18.0,
    stock: 25,
    imagen: "https://m.media-amazon.com/images/I/71vSRVNTeHL._AC_SL1500_.jpg",
    categoria: "Hogar"
  },
  {
    nombre: "Llaveros únicos",
    descripcion: "Llaveros metálicos con forma personalizada",
    precio: 6.5,
    stock: 80,
    imagen: "https://www.marti.mx/cdn/shop/products/1188320319_1_efb80051-1616-41d1-866b-04d07dc169e2.jpg",
    categoria: "Accesorios"
  },
  {
    nombre: "Sudadera estampada",
    descripcion: "Sudadera con diseño gráfico exclusivo",
    precio: 35.0,
    stock: 15,
    imagen: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/1390/410/712/1390410712_1_1_3.jpg",
    categoria: "Ropa"
  },
  {
    nombre: "Set de papelería",
    descripcion: "Set con bolígrafos, lápices y bloc de notas",
    precio: 11.0,
    stock: 35,
    imagen: "https://m.media-amazon.com/images/I/81McnLFOqxL._AC_SL1500_.jpg",
    categoria: "Papeleria"
  }
];

const users = [
  {
    userName: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    rol: "admin"
  },
  {
    userName: "Carlos",
    email: "carlos@example.com",
    password: bcrypt.hashSync("123456", 10),
    rol: "user"
  },
  {
    userName: "Laura",
    email: "laura@example.com",
    password: bcrypt.hashSync("123456", 10),
    rol: "user"
  },
  {
    userName: "Elena",
    email: "elena@example.com",
    password: bcrypt.hashSync("123456", 10),
    rol: "user"
  }
];

const seed = async () => {
  try {
    await connectBD();

    await Producto.deleteMany();
    await User.deleteMany();

    await Producto.insertMany(productos);
    await User.insertMany(users);

    console.log("✅ Productos y usuarios insertados correctamente");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error en la semilla:", error);
  }
};

seed();
