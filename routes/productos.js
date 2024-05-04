const express = require('express');
const router = express.Router();

let productos = [
    {
      id: 1,
      nombre: "Chocorramo x1",
      imagen: "/img/chocorramo_sin_fondo.png",
      precio: 800,
      cantidad: 60
    },
    {
      id: 2,
      nombre: "Gansito x2 uni",
      imagen: "/img/gansito_sin_fondo.png",
      precio: 2000,
      cantidad: 30
    },
    {
      id: 3,
      nombre: "Alqueria entera x1 caja",
      imagen: "/img/alqueria_sin_fondo.png",
      precio: 8000,
      cantidad: 25
    },
    {
      id: 4,
      nombre: "Bonyurt promo x5",
      imagen: "/img/bonyurt_sin_fondo.png",
      precio: 5850,
      cantidad: 43
    },
    {
      id: 5,
      nombre: "Alpinito x6",
      imagen: "/img/alpinito_sin_fondo.png",
      precio: 3200,
      cantidad: 37
    }
];

router.get('/', (req, res) => {
  res.json(productos);
});

router.post('/', (req, res) => {
  const { nombre, imagen, precio, cantidad } = req.body;
  const id = productos.length + 1;
  const nuevoProducto = { id, nombre, imagen, precio, cantidad };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, imagen, precio, cantidad } = req.body;
  const index = productos.findIndex(producto => producto.id === parseInt(id));
  if (index !== -1) {
    productos[index] = { id: parseInt(id), nombre, imagen, precio, cantidad };
    res.json(productos[index]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(producto => producto.id === parseInt(id));
  if (index !== -1) {
    productos.splice(index, 1);
    res.send('Producto eliminado');
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

module.exports = router;
