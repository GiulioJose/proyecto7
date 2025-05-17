require("dotenv").config();
const express = require("express");
const app = express();

// Middleware para JSON
app.use(express.json());

// Conectar a la base de datos
const { connectBD } = require("./src/config/db");
connectBD();

// Importar rutas de la tienda
const userRoutes = require("./src/api/routes/routeUser");
const productoRoutes = require("./src/api/routes/routeProducto");
const pedidoRoutes = require("./src/api/routes/routePedido");

// Usar rutas
app.use("/api/users", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🛒");
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en: http://localhost:${PORT} 🎯`);
});
