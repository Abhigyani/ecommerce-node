/**
 * Local modules import.
 */
const rootDir = require('../utils/path');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model'); 

const productsInCart = [];

/**
 * Middleware to fetch all the products from the storage/file and return the list to Shop page.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getProducts = (req, res, next) => {
    /**
     * Response to render dynamic template using templating engine.
     * .render() method check for the template engine reference bound for this express app.
     * 
     * Render function is passed in a callback to handle rendering of template on async data load.
     */
    Product.fetchAll((products) => {
        return res.render('shop/product-list',
            {
                products: products,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: products.length > 0,
                mainCSS: true,
                productCSS: true,
                activeShop: true
            });
    });

    /**
     * Response to render static HTML file.
     */
    // res.sendFile(path.join(rootDir, 'views', 'html', 'shop.html'));
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: productsInCart,
        productsInCartCount: productsInCart.length
    });
}


exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        return res.render('shop/index',
            {
                products: products,
                pageTitle: 'Shop',
                path: '/',
                hasProducts: products.length > 0,
                mainCSS: true,
                productCSS: true,
                activeShop: true
            });
    });
}


exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });  
}


exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('shop/product-detail', {
            pageTitle: 'Product Details',
            path: '/products',
            product: product
        })
    });
} 


exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
         res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            products: productsInCart,
            productsInCartCount: productsInCart.length
        });
    })
}