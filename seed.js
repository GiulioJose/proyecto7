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
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594107/camisetaPersonalizada_izc8r1.png",
    categoria: "Camisetas"
  },
  {
    nombre: "Taza mágica",
    descripcion: "Taza que cambia de color con líquido caliente",
    precio: 12.5,
    stock: 30,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594417/proyecto7/tazaMagica_bq3z9f.png",
    categoria: "Tazas"
  },
  {
    nombre: "Smartwatch",
    descripcion: "Nuevo Smartwatch con muchas apps preinstaladas",
    precio: 85.0,
    stock: 20,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594406/proyecto7/smartWatch_hmcie1.png",
    categoria: "Posters"
  },
  {
    nombre: "Pegatina",
    descripcion: "Pegatina resistente al agua y sol",
    precio: 3.99,
    stock: 100,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594427/proyecto7/pegatina_bawcej.png",
    categoria: "Pegatinas"
  },
  {
    nombre: "Libreta personalizada",
    descripcion: "Libreta con tapa dura y diseño único",
    precio: 9.5,
    stock: 40,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594887/proyecto7/libretas_tv5whs.png",
    categoria: "Libretas"
  },
  {
    nombre: "Funda para móvil",
    descripcion: "Funda con diseño impreso a medida",
    precio: 15.0,
    stock: 60,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594884/proyecto7/funda_abinzo.png",
    categoria: "Tecnología"
  },
  {
    nombre: "Cojín decorativo",
    descripcion: "Cojín suave con estampado personalizado",
    precio: 18.0,
    stock: 25,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594884/proyecto7/cojin_kckwes.png",
    categoria: "Hogar"
  },
  {
    nombre: "Llaveros únicos",
    descripcion: "Llaveros metálicos con forma personalizada",
    precio: 6.5,
    stock: 80,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594885/proyecto7/llaveros_mnttvo.png",
    categoria: "Accesorios"
  },
  {
    nombre: "Sudadera estampada",
    descripcion: "Sudadera con diseño gráfico exclusivo",
    precio: 35.0,
    stock: 15,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594884/proyecto7/sudadera_vddva5.png",
    categoria: "Ropa"
  },
  {
    nombre: "Set de papelería",
    descripcion: "Set con bolígrafos, lápices y bloc de notas",
    precio: 11.0,
    stock: 35,
    imagen: "https://res.cloudinary.com/dofudcbej/image/upload/v1748594886/proyecto7/setDePapeleria_svr7gx.png",
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
