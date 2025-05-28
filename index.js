require("dotenv").config(); // Carga variables de entorno desde .env
const express = require("express");
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Conectar a la base de datos
const { connectBD } = require("./src/config/db");
connectBD();

// Importar rutas de la API
const userRoutes = require("./src/api/routes/users.routes");
const productoRoutes = require("./src/api/routes/producto.route");
const pedidoRoutes = require("./src/api/routes/pedido.route");

// Usar las rutas
app.use("/api/users", userRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);

// Ruta de prueba para comprobar si el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🛒");
});

// Ruta 404 para cualquier ruta no definida
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Arrancar el servidor en el puerto definido en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en: http://localhost:${PORT} 🎯`);
});
