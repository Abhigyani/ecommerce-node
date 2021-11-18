/**
 * Local modules import.
 */
 const rootDir = require('../utils/path');
 const Product = require('../models/product.model');

 
/**
 * Middleware to load Add Product page.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getAddProduct = (req, res, next) => {

    /**
     * Response to render static HTML file.
     */
    // res.sendFile(path.join(rootDir, 'views', 'html', 'add-product.html'));

    /**
     * Response to render dynamic template using templating engine.
     * .render() method check for the template engine reference bound for this express app.
     */
    res.render('admin/add-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            mainCSS: true,
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        });
}


/**
 * Middleware to add each product to storage/file and then reload the Add Product page.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postAddProduct = (req, res, next) => {
    const {title, price, description} = req.body;
    const product = new Product(title, price, description);
    product.save();
    res.redirect('/admin/add-product');
}


/**
 * Admin product list middlware.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getAdminProductList = (req, res, next) => {
    Product.fetchAll((products) => {
        return res.render('admin/products',
            {
                products: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                mainCSS: true,
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true
            });
    });
}

exports.getEditProduct = (req, res, next) => {
    res.send('Hello');
}