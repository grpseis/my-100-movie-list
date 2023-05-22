const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');
const authMiddleware = require('../../middlewares/authorization');

router.use(authMiddleware);

router.get('/list/all', (req, res) => {
    //req.jwt_payload.role
    res.send("Endpoint para consultar las listas de todos los usuarios");
});

router.get('/list/all', (req, res) => {
    res.send("Endpoint para consultar las listas de todos los usuarios");
});

router.get('/list/:id', (req, res) => {
    res.send("Endpoint para consultar la lista de peliculas de un usuario: " + 
    JSON.stringify(req.params));
});

router.post('/list/:id/add', (req, res) => {
    res.send("Endpoint para añadir peliculas a una lista: " + 
    JSON.stringify(req.params));
});

router.delete('/list/:id/delete/:movie_id', (req, res) => {
    res.send("Endpoint para eliminar peliculas a una lista: ", 
    JSON.stringify(req.params));
});

router.put('/list/:id/rate', (req, res) => {
    res.send("Endpoint para calificar listas de otros usuarios");
});

module.exports = router;
