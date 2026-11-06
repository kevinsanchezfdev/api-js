// Arreglo en memoria de personas (pruebas oficiales laboratorio Strategy SENA)
const bd = [
  { nombre: "Zack", apellido: "Gómez" },
  { nombre: "Ana", apellido: "Pérez" }
];

const estrategias = {
  nombre: (a, b) => a.nombre.localeCompare(b.nombre),
  apellido: (a, b) => a.apellido.localeCompare(b.apellido),
  defecto: (a, b) => 0
};

const express = require('express');
const app = express();

// Middleware para interpretar cuerpos JSON en las peticiones
app.use(express.json());

// Puerto de escucha
const PORT = 3000;

// Ruta de prueba temporal (GET /)
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de personas - Laboratorio Strategy' });
});

// Ruta: Listar personas (GET /personas)
app.get('/personas', (req, res) => {
  const criterio = req.query.ordenarPor;
  const comparadora = estrategias[criterio] || estrategias.defecto;
  const copia = [...bd];
  copia.sort(comparadora);
  res.json(copia);
});

// Ruta: Agregar nueva persona (POST /personas)
app.post('/personas', (req, res) => {
  const nuevaPersona = req.body;
  // Validación básica: verificar que tenga nombre y apellido
  if (!nuevaPersona.nombre || !nuevaPersona.apellido) {
    return res.status(400).json({ error: 'La persona debe tener nombre y apellido' });
  }
  bd.push(nuevaPersona);
  res.status(201).json(nuevaPersona);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});