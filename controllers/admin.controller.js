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
    // res.sendFile(path.join(rootDir, 'views', 'html', 'edit-product.html'));

    /**
     * Response to render dynamic template using templating engine.
     * .render() method check for the template engine reference bound for this express app.
     */
    res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            mainCSS: true,
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            editing: false
        });
}


/**
 * Middleware to add each product to storage/file and then reload the Add Product page.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postAddProduct = (req, res, next) => {
    const { title, price, description, imageUrl } = req.body;
    Product.create({
        title: title,
        price: price,
        description: description
    }).then(() => {
        res.redirect('/admin/products');
    }).catch((error) => {
        console.log('Error while post add product: ', error);
    })
}


exports.getEditProduct = (req, res, next) => {
    const editMode = (req.query.edit) === 'true' ? true : false;
    const productId = req.params.productId;
    Product.findByPk(productId).then((product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    }).catch((error) => {
        throw `Error while fetching product by id in get edit products ${error}`;
    });
}

exports.postEditProduct = (req, res, next) => {
    Product.findByPk(req.params.productId).then((product) => {
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        return product.save();
    }).then((result) => {
        console.log('Post edit product successful: ', result);
        res.redirect('/admin/products');
    }).catch((error) => {
        throw `Error while updating product by id in post edit product ${error}`;
    });
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId).then((product) => {
        return product.destroy();
    }).then(() => {
        console.log('Product deleted');
        res.redirect('/admin/products');
    }).catch((error) => {
        throw `Error while deleting product ${error}`;
    });
}

/**
 * Admin product list middlware.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAdminProductList = (req, res, next) => {
    Product.findAll().then((products) => {
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
    }).catch((error) => {
        throw `Error while fetching product for admin products page ${error}`;
    });
}