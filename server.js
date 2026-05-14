const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./db');

const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();


// KAPCSOLATOK
Post.hasMany(Comment);

Comment.belongsTo(Post);


// MIDDLEWARE
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
                error: 'A cím túl rövid!'
            });

        }

        if (content.length < 5) {

            return res.status(400).json({
                error: 'A tartalom túl rövid!'
            });

        }

        const newPost = await Post.create({

            title,
            author,
            content

        });

        res.status(201).json(newPost);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

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

        res.status(201).json(newComment);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });

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