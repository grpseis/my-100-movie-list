const request = require('supertest');
const mongoose = require('mongoose');

const { goodMovielist, badMovielist } = require('./testData');
const app = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL);
}, 10000);

afterAll(async () => {
    await mongoose.connection.close();
}, 10000);

describe('Pruebas Unitarias Controlador movieList', () => {
    describe('Pruebas Endpoint registerMovie', () => {

        test('Prueba de registro, petición sin datos', async () => {
            const response = await request(app).
            post('/movies/list/federico/add').
            send();
            expect(response.statusCode).toBe(400);
        });

        test('Prueba de registro, peticion datos faltantes', async () => {
            const response = await request(app)
                .post('/movies/list/federico/add')
                .send(badMovielist);
            expect(response.statusCode).toBe(400);
        });

        test('Prueba de registro, peticion datos correctos', async () => {
            const response = await request(app)
                .post('/movies/list/federico/add')
                .send(goodMovielist);
            expect(response.statusCode).toBe(200);

        });


    });
});
