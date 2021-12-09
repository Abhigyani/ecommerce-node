// const getDb = require('../utils/database').getDb;

// class Product {
//     constructor(id=null, title, price, description) {
//         this.id = id;
//         this.title = title;
//         this.price = price;
//         this.description = description;
//     }

//     save() {
//         const db = getDb();
//         db.collection('products').insertOne(this)
//         .then((result) => {
//             console.log('Product Saved: ', result);
//         })
//         .catch((err) => {
//             console.log('Error saving product: ', err);
//         });
//     }
// }


// // const fs = require('fs');
// // const path = require('path');

// // const rootDir = require('../utils/path');
// // const Cart = require('./cart.model');

// // const dataStorePath = path.join(rootDir, 'data', 'products.json');

// // const getProductsFromFile = (callback) => {
// //     fs.readFile(dataStorePath, (err, data) => {
// //         if (err) {
// //             console.log('Error while fetching all the product data', err);
// //             return callback([]);
// //         }
// //         callback(JSON.parse(data));
// //     });
// // }

// // class Product {
// //     constructor(id=null, title, price, description) {
// //         this.id = id;
// //         this.title = title;
// //         this.price = price;
// //         this.description = description;
// //     }

// //     save() {
// //         getProductsFromFile((products) => {
// //             let updatedProduct = [...products];
// //             if(this.id) {
// //                 const productIndex = products.findIndex(product => product.id === this.id);
// //                 updatedProduct[productIndex] = this;
// //             } else {
// //                 this.id = Math.random().toString();
// //                 updatedProduct.push(this);
// //             }
// //             fs.writeFile(dataStorePath, JSON.stringify(updatedProduct), (err) => {
// //                 if (err) {
// //                     console.log('Error while saving and writing back to file: ', err);
// //                 }
// //             });
// //         });
// //     }

// //     static deleteById(productId) {
// //         getProductsFromFile((products) => {
// //             const product = products.find(product => product.id === productId);
// //             const updatedProduct = products.filter(product => product.id !== productId);
// //             fs.writeFile(dataStorePath, JSON.stringify(updatedProduct), (err) => {
// //                 if(err) {
// //                     console.log('Updating data store after product deletion failed !');
// //                 }
// //             });
// //             Cart.deleteFromCart(productId, product.price);
// //         })
// //     }

// //     static fetchAll(callback) {
// //         getProductsFromFile(callback);
// //     }

// //     setProperties(obj) {
// //         this.title = obj.title;
// //         this.price = obj.price;
// //         this.description = obj.description;
// //     }

// //     /**
// //      * A callback-hell coming your way! :)
// //      * @param {*} productId 
// //      * @param {*} callback 
// //      */
// //     static findById(productId, callback) {
// //         getProductsFromFile((products) => {
// //            const product =  products.find(product => product.id === productId);
// //             callback(product);
// //         })
// //     }
// // }

// module.exports = Product;


const sqlDb = require('../utils/sqldatabase');
const tableName = 'products';

class Product {
    constructor(id=null, title, price, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    static fetchAll() {
        const query = `SELECT * FROM products`;
        const promise = sqlDb.execute(query);
        return promise;
    }

    static fetchById(productId) {
        const query = `SELECT * FROM products WHERE id = ${productId}`;
        const promise = sqlDb.execute(query);
        return promise;
    }

    static updateById(product) {
        const query = `UPDATE ${tableName}
                        SET id = ${product.id},
                        title = '${product.title}',
                        price = ${product.price},
                        description = '${product.description}',
                        imageUrl = '${product.imageUrl}'
                        WHERE id = ${product.id};`

        console.log('QUERY: ', query);
        const promise = sqlDb.execute(query);
        return promise;
    }
}

module.exports = Product;