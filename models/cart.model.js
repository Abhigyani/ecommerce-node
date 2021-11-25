const fs = require('fs');
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

class Cart {
    /**
     *  // Fetch the previous cart.
        // Analyse the cart => Find the existing product.
        // Add new product/ increase quantity.
     * @param {*} id 
     */
    static addProduct(id, productPrice) {
        // Fetching the previous cart.
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            //Analyse the cart and find the existing product.
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + parseInt(productPrice);

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }
}

module.exports = Cart;