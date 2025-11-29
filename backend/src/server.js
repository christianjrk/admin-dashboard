import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

// Conexión a MongoDB
connectDB();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/api/auth", authRoutes);

// Rutas protegidas (requieren JWT)
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/stats", authMiddleware, statsRoutes);

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente ✔️");
});

// Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en: http://localhost:${PORT}`);
});
