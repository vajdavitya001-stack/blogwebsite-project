const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();
const sequelize = require('./db');
const Post = require('./models/Post');
const Comment = require ('./models/Comment');
const eventEmitter = require ('./queue');
Post.hasMany(Comment);
Comment.belongsTo(Post);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

sequelize.sync().then(() => { 
    console.log('Adatbázis szinkronizálva.');
});

//1.API végpont - összes blog lekérése

app.get('/api/posts', async (req,res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } 
    catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'public','index2.html'));
});

//2.API végpont - új blog létrehozása
app.post('/api/posts', async (req,res) => {
    console.log(req.body);
    try {
        const { title, author, content } = req.body;
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

        const newPost = await Post.create({
            title,
            author,
            content
        });
        eventEmitter.emit('postCreated', newPost);
        res.status(201).json(newPost);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            details: error.errors
        });

    }  
    /* res.status(201).json({
        message: 'Blog sikeresen létrehozva!',
        id: this.lastID,
        title,
        author,
        content
    });*/
});
            
eventEmitter.on('postCreated',(post) => {
    console.log('Új blog létrehozva:');
    console.log(post.title);
});        
    //posts.push(newPost);
    //res.status(201).json(newPost);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});
module.exports = app;