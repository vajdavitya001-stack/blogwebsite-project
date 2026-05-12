# Blogwebsite projekt
## Projekt leírás
    Ez egy egyszerű blogplatform Node.js, Express és SQLite használatával.
    A felhasználók:
        - blogbejegyzéseket hozhatnak létre,
        - megtekinthetik a blogokat,
        - kommentelhetnek
    
## Használt technológiák:
        - HTML
        - CSS
        - JavaScript
        - Node.js
        - Express
        - SQLite
        - Jest
        - Supertest

## Projekt struktúra
    ```text
    Blogwebsite/
    Public/
        index.html
        style.css
        script.js
    tests/
        posts.test.js
    db.js
    server.js
    blog.db
    package.json
    README.md

## Függőségek telepítése
npm install
node server.js
A weboldal elérhető: http://localhost:3000

## API végpontok
    GET /api/posts
        Visszaadja az összes blogbejegyzést JSON formátumban
        Példa válasz:
        [
            {
                "id": 1,
                "title": "Első blog",
                "author": "Viktor",
                "content": "Teszt tartalom"
            }
        ]
    
    POST /api/posts
        Új blogbejegyzést hoz létre
        Példa kérés:
        {
            "title": "Új blog",
            "author": "Anna",
            "content": "Blog tartalom"
        }

    Tesztek futtatása: npm test

## Adatbázis 
    Az alkalmazás SQLite relációs adatbázist használ.
    Táblák:
        - posts
        - comments