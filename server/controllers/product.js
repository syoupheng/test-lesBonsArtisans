const product = require('../services/product');
const { validationResult } = require('express-validator');

const productController = {
  getProducts: async (req, res) => {
    try {
      const docs = await product.list();
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).send({"msg": err.message});
    }
  },

  getProduct: async (req, res) => {
    const id = req.params.productId; 
    try {
      const docs = await product.getOne(id);
      res.status(200).json(docs[0]);
    } catch (err) {
      res.status(400).send({"msg": err.message});
    }
  },

  deleteProduct: async (req, res) => {
    const id = req.params.productId; 
    try {
      const mongoResponse = await product.destroy(id);
      if (mongoResponse.deletedCount === 0) return res.sendStatus(404);
      res.status(200).send({
        "_id": id,
        "msg": `product with id ${id} has been succesfully deleted`
      });
    } catch (err) {
      res.status(400).send({"msg": err.message});
    }
  },

  createProduct: async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const productData = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      rating: req.body.rating,
      warranty_years: req.body.warranty_years,
      available: req.body.available || false,
    }

    try {
      const productToInsert = await product.create(productData);
      const newProduct = await product.getOne(productToInsert.insertedId);
      res.status(201).json(newProduct[0]);
    } catch (err) {
      res.status(400).send({"msg": err.message});
    }
  },

  updateProduct: async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.productId; 
    const oldProduct = await product.getOne(id);
    if (!oldProduct) return res.sendStatus(404);

    const productData = {
      name: req.body.name || oldProduct[0].name,
      type: req.body.type || oldProduct[0].type,
      price: req.body.price || oldProduct[0].price,
      rating: req.body.rating || oldProduct[0].rating,
      warranty_years: req.body.warranty_years || oldProduct[0].warrant_years,
      available: req.body.available || oldProduct[0].available,
    }

    try {
      const newProduct = await product.edit(id, productData);
      res.status(200).json(newProduct.value);
    } catch (err) {
      res.status(400).send({"msg": err.message});
    }
  }
}

module.exports = productController;