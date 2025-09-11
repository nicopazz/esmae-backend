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
  origin: function (origin, callback) {
    const whitelist = [
      'http://localhost:5173',
      'http://localhost:5000',
      'https://tu-app.vercel.app'   // 👈 dominio del frontend en Vercel
    ];

    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Bloqueado por CORS:", origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para servir imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', '*'); // permite acceso desde cualquier origen
    res.set('Cross-Origin-Resource-Policy', 'same-site'); // o 'cross-origin' si es necesario
  }
}));


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