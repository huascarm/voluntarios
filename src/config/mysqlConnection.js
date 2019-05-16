import mysql from 'mysql';

module.exports = () => {
    return {
        voluntarios : mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'S4prissa',
            database: 'voluntarios'
        }),
        tse : mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'S4prissa',
            database: 'leogomez_tse'
        })
    };
}