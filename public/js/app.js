// Función para cargar los productos desde la API
function cargarProductos() {
    fetch('/productos')
      .then(response => response.json())
      .then(productos => {
        const listaProductos = document.getElementById('listaProductos');
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
          const div = document.createElement('div');
          div.className = 'col-md-4 mb-4';
          div.innerHTML = `
            <div class="card">
              <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <button class="btn btn-warning btn-block agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
              </div>
            </div>
          `;
          listaProductos.appendChild(div);
        });
      })
      .catch(error => console.error('Error al cargar los productos:', error));
  }
  
  // Función para filtrar productos
  function filtrarProductos() {
    const nombre = document.getElementById('nombre').value.toLowerCase();
    const listaProductos = document.getElementById('listaProductos');
  
    fetch('/productos')
      .then(response => response.json())
      .then(productos => {
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
          if (nombre === '' || producto.nombre.toLowerCase().includes(nombre)) {
            const div = document.createElement('div');
            div.className = 'col-md-4 mb-4';
            div.innerHTML = `
              <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">$${producto.precio}</p>
                  <button class="btn btn-warning btn-block agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
              </div>
            `;
            listaProductos.appendChild(div);
          }
        });
      })
      .catch(error => console.error('Error al cargar los productos:', error));
  }
  
  // Cargar los productos cuando la página se cargue
  document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
  });
  
  // Manejar el envío del formulario para buscar productos
  document.getElementById('formProducto').addEventListener('submit', function(event) {
    event.preventDefault();
    filtrarProductos();
  });
  


// Manejar clics en botones "Agregar al carrito"
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('agregar-carrito')) {
    const id = event.target.getAttribute('data-id');
    console.log('Agregar al carrito:', id);
    agregarAlCarrito(id);
  }
});

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  fetch('/agregar-al-carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })
  .then(response => response.json())
  .then(() => {
    console.log('Producto agregado al carrito:', id);
    // Redireccionar a carrito.html
    window.location.href = '/carrito.html';
  })
  .catch(error => console.error('Error al agregar el producto al carrito:', error));
}









// Manejar el endpoint para agregar productos al carrito
app.post('/agregar-al-carrito', (req, res) => {
    const idProducto = req.body.id;
    const producto = productos.find(producto => producto.id === idProducto);
    if (producto) {
      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.find(item => item.id === idProducto);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
        });
      }
      res.json({ message: 'Producto agregado al carrito' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });
  








// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulación de una base de datos de productos
let productos = [
    { id: 1, nombre: 'Chocorramo', precio: 1500, imagen: '/img/chocorramo.jpg' },
    { id: 2, nombre: 'Gansito', precio: 1200, imagen: '/img/gansito.jpg' },
    { id: 3, nombre: 'Alquería entera x1 caja', precio: 28000, imagen: '/img/alqueria.jpg' },
    { id: 4, nombre: 'Bonyurt', precio: 2500, imagen: '/img/bonyurt.jpg' },
    { id: 5, nombre: 'Alpinito', precio: 1800, imagen: '/img/alpinito.jpg' }
];

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar producto al carrito
app.post('/agregar-al-carrito', (req, res) => {
    const idProducto = parseInt(req.body.id);
    const producto = productos.find(producto => producto.id === idProducto);

    if (producto) {
        // Aquí debería ir la lógica para agregar el producto al carrito
        res.json({ message: `Producto ${producto.nombre} agregado al carrito.` });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));























// Obtener todos los productos
app.get('/productos', (req, res) => {
    Producto.find()
      .then(productos => {
        res.json(productos);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  });

  




  // Agregar un nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, precio, imagen } = req.body;
    const nuevoProducto = new Producto({ nombre, precio, imagen });
  
    nuevoProducto.save()
      .then(producto => {
        res.status(201).json(producto);
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  });

  





  // Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const idProducto = req.params.id;
    const { nombre, precio, imagen } = req.body;
  
    Producto.findByIdAndUpdate(idProducto, { nombre, precio, imagen }, { new: true })
      .then(producto => {
        if (!producto) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  });












































