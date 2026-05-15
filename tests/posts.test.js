const request = require('supertest');
const app = require('../server');
describe('Blog API tesztek', () => {
    test('GET /api/posts visszaadja a bejegyzéseket', async() => {
        const response = await request(app).get('/api/posts');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/posts létrehoz új bejegyzést', async () => {
        const response = await request(app)
        .post('/api/posts')
        .send({
            title: 'Teszt cím',
            author: 'Teszt szerző',
            content: 'Teszt tartalom'
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.post.title).toBe('Teszt cím');
        expect(response.body.post.author).toBe('Teszt szerző');
    });
});

module.exports = app;