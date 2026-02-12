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


//Route to get appointments
app.get("/api/appointments", (req, res) => {
  const {userId, role} = req.query;
  const dataPath = path.join(__dirname, "data", "appointments.json");
  const appointments = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const filteredAppointments = appointments.filter(a => role == "client" ? a.clientId ==userId : a.workerId == userId);
  res.json(filteredAppointments);
});


//Route to get users
app.get("/api/users", (req, res) => {
  const dataPath = path.join(__dirname, "data", "users.json");
  const users = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(users));
});

//Route to get services
app.get("/api/services", (req, res) => {
  const dataPath = path.join(__dirname, "data", "services.json");
  const services = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(services));
});

//Endpoint login
app.post("/api/login", (req, res) => {
  try{
      const {email, password} = req.body;
      const dataPath = path.join(__dirname, "data", "users.json");
      const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      const user = users.find(u => u.email === email && u.password === password);
      if(!user){
        return res.status(401).json({message: "Invalid credentials"});
      }
      res.json({message: "Login successful",
      user: {id: user.id, name: user.name, email: user.email, role: user.role , token: "fake-jwt-token"}
    });

  }
  catch(error){
    res.status(500).json({message: "Internal server error"});
  }
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
