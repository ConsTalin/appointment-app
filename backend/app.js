import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Citas');
})


//Ruta para obtener datos
app.get("/api/appointments", (req, res) => {
  const dataPath = path.join(__dirname, "data", "appointments.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
