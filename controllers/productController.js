const Product = require('../models/Product');


// GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice
    } = req.query;

    const andFilters = [];

    if (typeof search === 'string' && search.trim().length > 0) {
      andFilters.push({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      });
    }

    if (category) {
      andFilters.push({
        category: { $regex: category, $options: 'i' }
      });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter = {};
      if (!isNaN(minPrice)) priceFilter.$gte = Number(minPrice);
      if (!isNaN(maxPrice)) priceFilter.$lte = Number(maxPrice);
      if (Object.keys(priceFilter).length > 0) {
        andFilters.push({ price: priceFilter });
      }
    }

    const query = andFilters.length > 0 ? { $and: andFilters } : {};

    
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'ID inválido' });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Producto eliminado' });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
