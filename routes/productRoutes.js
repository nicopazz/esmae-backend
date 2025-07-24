const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const validarProducto = require('../middleware/validarProducto');
const verifyToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadImage');
const multer = require('multer');
const normalizarNumericos = require('../middleware/normalizarNumericos');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Crear un nuevo producto con validación y admin solamente
router.post(
  '/',
  upload.single('image'), 
  normalizarNumericos,       // primero procesamos la imagen y los datos
  validarProducto,               // después validamos los datos ya disponibles
  verifyToken,                   // autenticación
  isAdmin,                       // verificación de rol
  async (req, res) => {
    try {
      const { name, description, price, stock, dimensions, category } = req.body;

      const nuevoProducto = new Product({
        name,
        description,
        price,
        stock,
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
        dimensions: dimensions ? JSON.parse(dimensions) : undefined,
        category
      });

      const productoGuardado = await nuevoProducto.save();
      res.status(201).json(productoGuardado);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear producto', error });
    }
  }
);

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto' });
  }
});

// Actualizar producto con validación y admin solamente
router.put('/:id', validarProducto, verifyToken, isAdmin, async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto' });
  }
});

// Eliminar producto con validación y admin solamente
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;
