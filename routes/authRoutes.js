const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { actualizarRolUsuario } = require('../controllers/authController');
const verificarToken = require('../middleware/authMiddleware');
const verificarAdmin = require('../middleware/authMiddleware');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });

  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET || 'clave_secreta',
      { expiresIn: '2h' }
    );

    // 👇 devolvemos token + usuario sin password
    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});


router.put('/role/:id', verificarToken, verificarAdmin, actualizarRolUsuario);
router.delete('/role/:id', verificarToken, verificarAdmin, actualizarRolUsuario);

module.exports = router;
