const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Adatbázis-beállítás
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);
    
    db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER,
            username TEXT NOT NULL,
            text TEXT NOT NULL,
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
    `);
});

//1.API végpont - összes blog lekérése
/*let posts = [
    {
        id: 1,
        title: 'Első blog',
        author: 'Admin',
        content: 'Ez az első bejegyzés.'
    }
];*/

app.get('/api/posts', (req,res) => {
    db.all('SELECT * FROM posts', [], (err,rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

    res.status(200).json(rows);
    });
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'public','index2.html'));
});

//2.API végpont - új blog létrehozása
app.post('/api/posts', (req,res) => {
    const { id, title, author, content } = req.body;
//VALIDÁLÁS
    if(!title || !author || !content) {
        return res.status(400).json({
            error: 'Minden mező kitöltése kötelező!'
        });
    }

    if(title.length < 3) {
        return res.status(400).json({
            error: 'Az Ön által megadott címnek legalább 3 karakteresnek kell lennie!'
        });
    }

    if(content.length < 5) {
        return res.status(400).json({
            error: 'Az Ön által megadott tartalom túl rövid!'
        });
    }

    db.run(
        `INSERT INTO posts (title, author, content) VALUES(?,?,?)`,
        [title,author,content],
        function(err) {
            if(err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(201).json({
                message: 'Blog sikeresen létrehozva!',
                id: this.lastID,
                title,
                author,
                content
            });
        }
    );
});
        
    //posts.push(newPost);
    //res.status(201).json(newPost);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});
module.exports = app;