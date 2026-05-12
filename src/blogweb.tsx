export default function Blogwebsite()
{
    return(
    <>
    <header>
        <h1>Egyszerű blog</h1>
        <p>Egyszerű blogplatform</p>
    </header>

    <div className="container">
        <section className="posts" id="postsContainer">
        </section>
    
        <div>
            <h2>Új bejegyzés</h2>
            <form className="new-post-form" id="newPostForm">
                <input type="text" id="postTitle" placeholder="Bejegyzés címe" required/>
                <input type="text" id="postAuthor" placeholder="Szerző neve" required/>
                <textarea id="postContent" placeholder="Bejegyzés tartalma" required></textarea>
                <button type="submit">Bejegyzés közzététele </button>
            </form>
        </div>
    </div>

    <footer>
        <p>&#169; 2026 SimpleBlog Project</p>
    </footer>
    )
</>)}