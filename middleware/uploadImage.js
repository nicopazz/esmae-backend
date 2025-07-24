const multer = require('multer');
const path = require('path');

// Configuración del storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardan
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

// Filtro de tipo de archivo
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (.jpg, .jpeg, .png, .webp)'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
});

module.exports = upload;
