const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '0.0.0.0',
    user: 'root',
    database: 'node-complete',
    password: 'admin'
});

module.exports = pool.promise();