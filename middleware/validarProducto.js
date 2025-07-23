const { body, validationResult } = require('express-validator');

const validarProducto = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isNumeric().withMessage('El precio debe ser un número'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('image')
    .optional()
    .isString().withMessage('La imagen debe ser una URL o texto'),
  body('dimensions.width')
    .optional()
    .isNumeric().withMessage('El ancho debe ser un número'),
  body('dimensions.height')
    .optional()
    .isNumeric().withMessage('El alto debe ser un número'),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = validarProducto;
