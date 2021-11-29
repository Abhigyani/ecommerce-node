const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const Cart = require('./cart.model');

const dataStorePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(dataStorePath, (err, data) => {
        if (err) {
            console.log('Error while fetching all the product data', err);
            return callback([]);
        }
        callback(JSON.parse(data));
    });
}

class Product {
    constructor(id=null, title, price, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            let updatedProduct = [...products];
            if(this.id) {
                const productIndex = products.findIndex(product => product.id === this.id);
                updatedProduct[productIndex] = this;
            } else {
                this.id = Math.random().toString();
                updatedProduct.push(this);
            }
            fs.writeFile(dataStorePath, JSON.stringify(updatedProduct), (err) => {
                if (err) {
                    console.log('Error while saving and writing back to file: ', err);
                }
            });
        });
    }

    static deleteById(productId) {
        getProductsFromFile((products) => {
            const product = products.find(product => product.id === productId);
            const updatedProduct = products.filter(product => product.id !== productId);
            fs.writeFile(dataStorePath, JSON.stringify(updatedProduct), (err) => {
                if(err) {
                    console.log('Updating data store after product deletion failed !');
                }
            });
            Cart.deleteFromCart(productId, product.price);
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    setProperties(obj) {
        this.title = obj.title;
        this.price = obj.price;
        this.description = obj.description;
    }

    /**
     * A callback-hell coming your way! :)
     * @param {*} productId 
     * @param {*} callback 
     */
    static findById(productId, callback) {
        getProductsFromFile((products) => {
           const product =  products.find(product => product.id === productId);
            callback(product);
        })
    }
}

module.exports = Product;