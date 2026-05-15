const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const app = express();
Post.hasMany(Comment);
Comment.belongsTo(Post);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ADATBÁZIS SZINKRONIZÁLÁS
sequelize.sync().then(() => {
    console.log('Adatbázis szinkronizálva.');
});

// ÖSSZES BLOG LEKÉRÉSE
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: Comment
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// ÚJ BLOG LÉTREHOZÁSA
app.post('/api/posts', async (req, res) => {
    try {
        const { title, author, content } = req.body;

        // VALIDÁLÁS
        if (!title || !author || !content) {
            return res.status(400).json({
                error: 'Minden mező kitöltése kötelező!'
            });
        }
        if (title.length < 3) {
            return res.status(400).json({
                error: 'A cím túl rövid, min. 3 karakter!'
            });
        }
        if (content.length < 10) {
            return res.status(400).json({
                error: 'A tartalom túl rövid, min. 10 karakter!'
            });
        }
        if (author.length < 2) {
            return res.status(400).json({
                error: 'A tartalom túl rövid, min. 2 karakter!'
            });
        }

        const newPost = await Post.create({
            title,
            author,
            content
        });
        res.status(201).json({ message:'Blog sikeresen létrehozva!', post: newPost});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ÚJ KOMMENT
app.post('/api/comments', async (req, res) => {
    try {
        const { username, text, PostId } = req.body;
        if (!username || !text) {
            return res.status(400).json({
                error: 'Minden mező kitöltése kötelező!'
            });
        }
        const newComment = await Comment.create({
            username,
            text,
            PostId
        });
        res.status(201).json( { message:'Komment sikeresen létrehozva!',comment:newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// FŐOLDAL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});


// SZERVER
const PORT = 3000;
if(require.main === module) {
    app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
    });
}
module.exports = app;