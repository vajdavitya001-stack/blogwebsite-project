const posts = [];
const postsContainer = document.getElementById('postsContainer');
const newPostForm = document.getElementById('newPostForm');

// Blogok kirajzolása
function renderPosts() {
postsContainer.innerHTML = '';

posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post-card');

    postElement.innerHTML = `
          <h2 class="post-title">${post.title}</h2>

          <div class="post-meta">
            Szerző: ${post.author}
          </div>

          <div class="post-content">
            ${post.content}
          </div>

          <div class="comments">
            <h3>Kommentek (${post.comments.length})</h3>

            <div class="comments-list">
              ${post.comments.map(comment => `
                <div class="comment">
                  <strong>${comment.user}</strong>
                  <p>${comment.text}</p>
                </div>
              `).join('')}
            </div>

            <form class="comment-form" data-id="${post.id}">
              <input 
                type="text" 
                name="username" 
                placeholder="Neved" 
                required
              />

              <textarea 
                name="comment" 
                rows="3" 
                placeholder="Írj kommentet..." 
                required
              ></textarea>

              <button type="submit">Komment küldése</button>
            </form>
          </div>
        `;

    postsContainer.appendChild(postElement);
      });

    setupCommentForms();
    }

    // Komment űrlapok kezelése
    function setupCommentForms() {
      const commentForms = document.querySelectorAll('.comment-form');

      commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
          e.preventDefault();

          const postId = Number(form.dataset.id);

          const username = form.username.value.trim();
          const commentText = form.comment.value.trim();

          if (!username || !commentText) return;

          const post = posts.find(p => p.id === postId);

          post.comments.push({
            user: username,
            text: commentText
          });

          renderPosts();
        });
      });
    }

    // Új blogbejegyzés hozzáadása
    newPostForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const author = document.getElementById('postAuthor').value.trim();
      const title = document.getElementById('postTitle').value.trim();
      const content = document.getElementById('postContent').value.trim();

      if (!author || !title || !content) return;

      const newPost = {
        id: Date.now(),
        author,
        title,
        content,
        comments: []
      };

      posts.unshift(newPost);

      alert('A blogbejegyzés sikeresen létrejött!');

      newPostForm.reset();

      renderPosts();
    });

    // Kezdeti render
    renderPosts();

    


//         const posts = [
//       {
//         id: 1,
//         title: 'Első blogbejegyzés',
//         author: 'Admin',
//         content: 'Ez egy egyszerű blogplatform frontend projekt.',
//         comments: [
//           {
//             user: 'Anna',
//             text: 'Nagyon jól néz ki!'
//           }
//         ]
//       },
//       {
//         id: 2,
//         title: 'JavaScript használata',
//         author: 'Péter',
//         content: 'A JavaScript segítségével dinamikusan kezelhetjük a bejegyzéseket és kommenteket.',
//         comments: []
//       }
//     ];

// const postsContainer = document.getElementById('postsContainer');
//     const newPostForm = document.getElementById('newPostForm');

//     function renderPosts() {
//       postsContainer.innerHTML = '';

//       posts.forEach(post => {
//         const postElement = document.createElement('article');
//         postElement.classList.add('post-card');

//         postElement.innerHTML = `
//           <h2 class="post-title">${post.title}</h2>
//           <div class="post-meta">Szerző: ${post.author}</div>
//           <div class="post-content">${post.content}</div>

//           <section class="comments">
//             <h3>Kommentek (${post.comments.length})</h3>

//             <div class="comments-list">
//               ${post.comments.map(comment => `
//                 <div class="comment">
//                   <strong>${comment.user}</strong>
//                   <p>${comment.text}</p>
//                 </div>
//               `).join('')}
//             </div>

//             <form class="comment-form" data-post-id="${post.id}">
//               <input type="text" name="username" placeholder="Neved" required />
//               <textarea name="comment" rows="3" placeholder="Írj kommentet..." required></textarea>
//               <button type="submit">Komment küldése</button>
//             </form>
//           </section>
//         `;

//         postsContainer.appendChild(postElement);
//       });

//       setupCommentForms();
//     }

//     function setupCommentForms() {
//       const commentForms = document.querySelectorAll('.comment-form');

//       commentForms.forEach(form => {
//         form.addEventListener('submit', function(e) {
//           e.preventDefault();

//           const postId = Number(form.dataset.postId);
//           const username = form.username.value.trim();
//           const commentText = form.comment.value.trim();

//           if (!username || !commentText) return;

//           const post = posts.find(p => p.id === postId);

//           post.comments.push({
//             user: username,
//             text: commentText
//           });

//           renderPosts();
//         });
//       });
//     }

//     newPostForm.addEventListener('submit', function(e) {
//       e.preventDefault();

//       const title = document.getElementById('postTitle').value.trim();
//       const author = document.getElementById('postAuthor').value.trim();
//       const content = document.getElementById('postContent').value.trim();

//       if (!title || !author || !content) return;

//       const newPost = {
//         id: Date.now(),
//         title,
//         author,
//         content,
//         comments: []
//       };

//       posts.unshift(newPost);

//       newPostForm.reset();
//       renderPosts();
//     });

//     renderPosts();
    
// function uzenet() {
//     alert("A bejegyzés közzététele megtörtént!");
// }

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const sqlite3 = require('better-sqlite3');
// const app = express();
// app.use(express.json());
// db.run(`
//     CREATE TABLE IF NOT EXISTS posts (
//     postId INTEGER PRIMARY KEY AUTOINCREMENT,
//     postName TEXT NOT NULL, 
//     postAuthor TEXT NOT NULL,
//     postContent TEXT
//     )`);
// app.get("/", (req, res) => {
//     res.send("Mukodik a szerver!");
// });
// app.listen(3000,() => {
//     console.log("A szerver fut a 3000-es porton.");
// });
// const db = new sqlite3.Database("database.db");
// console.log("Adatbázis csatlakozva!");
// module.exports=db;

// db.query(
//     'SELECT*FROM posts', (err,results) => {
//         if(err) {
//             console.log(err);
//             return;
//         }
//         console.log(results);
//     }
// );

// app.post('/posts',
//     [
//         body('postTitle')
//         .notEmpty()
//         .isLength({min:5, max:200})
//         .withMessage('A cím megadása kötelező és 5-100 karakter között lehet!'),

//         body('postAuthor')
//         .notEmpty()
//         .isLength({min:2, max:50})
//         .withMessage('A szerző neve kötelező és 2-50 karakter lehet!'),
        
//         body('postContent')
//         .notEmpty()
//         .isLength({min:20, max:200})
//     ],
//     (req,res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()){
//             return res.status(400).json({
//                 errors:errors.array()
//             });
//         }
//         res.send('Sikeres rögzítés');
//     }
// );