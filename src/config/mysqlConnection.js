import mysql from 'mysql';

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'S4prissa',
        database: 'voluntarios'
    })
}