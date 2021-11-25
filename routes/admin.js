/**
 * Third party module imports.
 */
const { Router } = require('express');

/**
 * Node core module imports.
 */


/**
 * Local module imports.
 */
const adminController = require('../controllers/admin');

const router = new Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getAdminProductList);
router.get('/edit-product/:productId', adminController.getEditProduct);

module.exports = router;