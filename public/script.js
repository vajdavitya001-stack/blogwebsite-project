const postsContainer = document.getElementById('postsContainer');

const newPostForm = document.getElementById('newPostForm');


// BLOGOK BETÖLTÉSE
async function loadPosts() {

    try {

        const response = await fetch('/api/posts');

        const posts = await response.json();

        postsContainer.innerHTML = '';

        posts.forEach(post => {

            const postElement = document.createElement('article');

            postElement.classList.add('post-card');

            postElement.innerHTML = `

                <h2>${post.title}</h2>

                <p>
                    <strong>Szerző:</strong>
                    ${post.author}
                </p>

                <p>${post.content}</p>

                <hr>

                <h3>Kommentek</h3>

                <div class="comments">

                    ${post.Comments.map(comment => `

                        <div class="comment">

                            <strong>${comment.username}</strong>

                            <p>${comment.text}</p>

                        </div>

                    `).join('')}

                </div>

                <form class="commentForm">

                    <input
                        type="text"
                        placeholder="Neved"
                        class="commentUsername"
                        required
                    >

                    <textarea
                        placeholder="Komment..."
                        class="commentText"
                        required
                    ></textarea>

                    <button type="submit">
                        Komment küldése
                    </button>

                </form>

            `;

            postsContainer.appendChild(postElement);


            // KOMMENT KÜLDÉS
            const commentForm = postElement.querySelector('.commentForm');

            commentForm.addEventListener('submit', async (e) => {

                e.preventDefault();

                const username = commentForm.querySelector('.commentUsername').value;

                const text = commentForm.querySelector('.commentText').value;

                try {

                    const response = await fetch('/api/comments', {

                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({

                            username,
                            text,
                            PostId: post.id

                        })

                    });

                    const data = await response.json();

                    if (!response.ok) {

                        alert(data.error);

                        return;

                    }

                    loadPosts();

                } catch (error) {

                    console.error(error);

                }

            });

        });

    } catch (error) {

        console.error(error);

    }

}


// ÚJ BLOG
newPostForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const author = document.getElementById('postAuthor').value.trim();

    const title = document.getElementById('postTitle').value.trim();

    const content = document.getElementById('postContent').value.trim();

    try {

        const response = await fetch('/api/posts', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                title,
                author,
                content

            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.error);

            return;

        }

        alert('Blog sikeresen létrehozva!');

        newPostForm.reset();

        loadPosts();

    } catch (error) {

        console.error(error);

    }

});


// KEZDETI BETÖLTÉS
loadPosts();
