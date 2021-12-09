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
    Product.fetchAll().then((result) => {
        const products = result[0];
        return res.render('shop/product-list', {
            products: products,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: products.length > 0,
                mainCSS: true,
                productCSS: true,
                activeShop: true
        })
    }).catch((error) => {
        throw `Error which fetching all the products for products page ${error}`;
    });

    /**
     * Response to render static HTML file.
     */
    // res.sendFile(path.join(rootDir, 'views', 'html', 'shop.html'));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then((result) => {
        const products = result[0];
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
    Product.fetchById(productId).then((result) => {
        const product = result[0][0];
        res.render('shop/product-details', {
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
        Product.fetchAll().then((result) => {
            const products = result[0];
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
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
    Product.fetchById(productId).then((result) => {
        const product = result[0][0];
        Cart.addToCart(productId, product.price);
        res.redirect('/cart');
    }).catch((error) => {
        throw `Error while fetching product by id in post cart ${error}`;
    })
}

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;
    Cart.deleteFromCart(productId, productPrice);
    res.redirect('/cart');
}