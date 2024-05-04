const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Rutas
const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
