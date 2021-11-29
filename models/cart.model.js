const fs = require('fs')
const path = require('path')

const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json');
class Cart{
    static addProduct(productId, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[], totalPrice: 0}
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            let productIndex = cart.products.findIndex((product) => product.id == productId);
            if(productIndex === -1) {
                let incomingProduct = {id: productId, qty: 1}
                cart.products = [...cart.products, incomingProduct];
            } else {
                cart.products[productIndex]['qty'] = cart.products[productIndex]['qty'] + 1;
            }
            cart.totalPrice = cart.totalPrice + parseInt(productPrice);

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log('Saving to cart failed!');
                }
            });
        });
    }
}

module.exports = Cart