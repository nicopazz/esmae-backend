
const normalizarNumericos = (req, res, next) => {
  if (req.body.price) {
    req.body.price = Number(req.body.price);
  }

  if (req.body.stock) {
    req.body.stock = parseInt(req.body.stock);
  }

  next();
};

module.exports = normalizarNumericos;
