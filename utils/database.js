const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://mongoadmin:secret@localhost:27888/?authSource=admin')
        .then((client) => {
            console.log('MongoClient successfully connected!');
            _db = client.db();
            callback(client);
        })
        .catch((err) => {
            console.log('Error establishing connection to MongoClient : ', err);
            throw err;
        })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;