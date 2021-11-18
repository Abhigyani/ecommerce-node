const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

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
    constructor(title, price, description) {
        this.title = title;
        this.price = price;
        this.description = description;

        console.log('Product Title: ', this.title);
        console.log('Product Price: ', this.price);
        console.log('Product Desc: ', this.description);
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(dataStorePath, JSON.stringify(products), (err) => {
                if (err) {
                    console.log('Error while saving and writing back to file: ', err);
                }
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    setProperties(obj) {
        this.title = obj.title;
        this.price = obj.price;
        this.description = obj.description;
    }
}

module.exports = Product;