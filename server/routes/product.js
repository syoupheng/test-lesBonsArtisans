const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();
const { productInsertSchema, productUpdateSchema } = require('../validationSchemas/product');
const { checkSchema } = require('express-validator');

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProduct);
router.delete('/:productId', productController.deleteProduct);
router.post('/', checkSchema(productInsertSchema), productController.createProduct);
router.put('/:productId', checkSchema(productUpdateSchema), productController.updateProduct);

module.exports = router;