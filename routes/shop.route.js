/**
 * Third party module imports.
 */
const { Router } = require('express');

/**
 * Node core module imports.
 */
const path = require('path');

/**
 * Local module imports.
 */
const shopController = require('../controllers/shop.controller');

const router = new Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/orders', shopController.getOrders);
router.get('/product-details/:productId', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postDeleteCartItem);

module.exports = router;