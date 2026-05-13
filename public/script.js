//const posts = [];
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

          //renderPosts();
        });
      });
    }

    // Új blogbejegyzés hozzáadása
    newPostForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const author = document.getElementById('postAuthor').value.trim();
      const title = document.getElementById('postTitle').value.trim();
      const content = document.getElementById('postContent').value.trim();
      async function loadPosts() {

  const response = await fetch('/api/posts');

  const posts = await response.json();

  postsContainer.innerHTML = '';

  posts.forEach(post => {

    const postElement = document.createElement('article');

    postElement.classList.add('post-card');

    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Szerző:</strong> ${post.author}</p>
      <p>${post.content}</p>
    `;

    postsContainer.appendChild(postElement);

  });

}
      try {
        const response = await fetch ('/api/posts', {
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
      
      alert('A blogbejegyzés sikeresen létrejött!');

      newPostForm.reset();
    } catch(error) {
        console.error(error);
        alert("Hiba történt.");
    } 
      

    // Kezdeti render
    //renderPosts();

    //Media and Streams API beállítása
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startCameraBtn = document.getElementById('startCamera');
    const takePhotoBtn = document.getElementById('takePhoto');
    let stream;
    startCameraBtn.addEventListener('click',async()=>{
      try{
        stream = await navigator.mediaDevices.getUserMedia({
          video:true,
          audio:false
        });
        video.srcObject = stream;
      }
      catch(error) {
        console.error('Kamera hiba:',error);
        alert('Nem sikerült elérni a kamerát.');
      }
    });

    takePhotoBtn.addEventListener('click', () => {
      const context = canvas.getContext ('2d');
      context.drawImage(video,0,0,canvas.clientWidth, canvas.height);
    });
}); 