const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
const errorHandler = require('./middleware/errorHandler');

// Cargar variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

const app = express();

// Middlewares globales
app.use(cors({
  origin: 'http://localhost:3000', // o el dominio de tu frontend
  credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para servir imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas principales
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Middleware global de manejo de errores (después de las rutas)
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});