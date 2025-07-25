const errorHandler = (err, req, res, next) => {
  // Log completo del error en consola
  console.error('🛑 Error:', err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Ocurrió un error inesperado',
    // Mostrar el stack solo si estás en desarrollo
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;