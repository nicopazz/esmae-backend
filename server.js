const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

// Config
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Rutas
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Middleware para manejar la carga de imágenes
app.use('/uploads', express.static('uploads'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));