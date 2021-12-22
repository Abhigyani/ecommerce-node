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
    Product.findAll().then((products) => {
        return res.render('shop/product-list', {
            products: products,
            pageTitle: 'Shop',
            hasProducts: products.length > 0,
            mainCss: true,
            productCss: true,
            activeShop: true,
            path: '/'
        })
    }).catch((error) => {
        throw `Error which fetching all the products for products page ${error}`;

    })

    /**
     * Response to render static HTML file.
     */
    // res.sendFile(path.join(rootDir, 'views', 'html', 'shop.html'));
}

/**
 * Middleware to render the index page.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getIndex = (req, res, next) => {
    Product.findAll().then((products) => {
        return res.render('shop/index', {
            products: products,
            pageTitle: 'Shop',
            hasProducts: products.length > 0,
            mainCss: true,
            productCss: true,
            activeShop: true,
            path: '/'
        })
    }).catch((error) => {
        throw `Error while fetching product in index page ${error}`;
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });
}

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId).then((product) => {
        res.render('shop/product-detail', {
            pageTitle: 'Product Details',
            path: '/products',
            product: product
        })
    }).catch((error) => {
        throw `Error while fetching product by id in get product details ${error}`;
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.findAll().then((products) => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }

            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts
            })
        }).catch((error) => {
            throw `Error while fetching products for carts page ${error}`;
        });
    });
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId).then((product) => {
        Cart.addToCart(productId, product.price);
        res.redirect('/cart');
    }).catch((error) => {
        throw `Error while fetching product by id in post cart ${error}`;
    });
}

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;
    Cart.deleteFromCart(productId, productPrice);
    res.redirect('/cart');
}