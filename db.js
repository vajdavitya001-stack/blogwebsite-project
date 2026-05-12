const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db', (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('Kapcsolódva az SQLite adatbázishoz.');
    }
});

module.exports = db;