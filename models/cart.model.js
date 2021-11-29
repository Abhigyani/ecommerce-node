const fs = require('fs')
const path = require('path')

const rootDir = require('../utils/path');

const cartFilePath = path.join(rootDir, 'data', 'cart.json');

const readFromFile = (callback) => {
    fs.readFile(cartFilePath, (err, fileContent) => {
        if(err) {
            callback(null);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}
class Cart {

    static addToCart(productId, productPrice) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            let cartData = !err ? JSON.parse(fileContent) : { products: [], totalPrice: 0 }
            let productIndex = cartData.products.findIndex((product) => product.id == productId);
            if (productIndex === -1) {
                let incomingProduct = { id: productId, qty: 1 }
                cartData.products = [...cartData.products, incomingProduct];
            } else {
                cartData.products[productIndex]['qty'] = cartData.products[productIndex]['qty'] + 1;
            }
            cartData.totalPrice = cartData.totalPrice + parseInt(productPrice);

            fs.writeFile(cartFilePath, JSON.stringify(cartData), (err) => {
                if (err) {
                    console.log('Saving to cart failed!');
                }
            });
        });
    }

    static deleteFromCart(productId, productPrice) {
        fs.readFile(cartFilePath, (err, fileContent,) => {
            if (!err) {
                let cart = JSON.parse(fileContent);
                let updatedCart = { ...cart };
                const product = updatedCart.products.find(product => product.id === productId);
                if(!product) {
                    return;
                }
                const productQty = parseInt(product.qty);
                updatedCart.products = updatedCart.products.filter(product => product.id !== productId);
                updatedCart.totalPrice = parseInt(updatedCart.totalPrice) - (productQty * parseInt(productPrice));

                fs.writeFile(cartFilePath, JSON.stringify(updatedCart), (err) => {
                    if (err) {
                        console.log('Error while writing to file after removing the product from cart.');
                    }
                })
            }
        })
    }

    static getCart(callback) {
        readFromFile(callback);
    }
}

module.exports = Cart