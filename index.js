require("dotenv").config();
const express = require("express");
const app = express();

// Middleware para JSON antes de cualquier ruta
app.use(express.json());

// Conectar a la base de datos
const { connectBD } = require("./src/config/db");
connectBD();

// Registrar modelos
require("./src/api/models/modelAutor");

// Importar rutas
const librosRoutes = require("./src/api/routes/routeLibro");
const autoresRoutes = require("./src/api/routes/routeAutor");

// Usar rutas
app.use("/libros", librosRoutes);
app.use("/autores", autoresRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Levantar servidor
app.listen(3000, () => {
  console.log("Servidor levantado en: http://localhost:3000 🎯");
});
