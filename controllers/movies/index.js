const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');
const authMiddleware = require('../../middlewares/authorization');

router.use(authMiddleware);



// Endpoint para consultar las listas de todos los usuarios
router.get('/list/all', (req, res) => {
     moviesMethods.allMovieslist(req, res);
});

/*router.get('/list/all', (req, res) => {
    res.send("Endpoint para consultar las listas de todos los usuarios");
    moviesMethods.allMovieslist(req, res);
});
*/

//Endpoint para consultar la lista de peliculas de un usuario
router.get('/list/:id', (req, res) => {
    moviesMethods.oneMovieslist(req , res);
});


//Endpoint para añadir peliculas a una lista
router.post('/list/:id/add', (req, res) => {
    moviesMethods.registerMovie(req, res);
});


// Endpoint para eliminar peliculas a una lista
// para eliminar utilizamos la posición de la pelicula en la lista
router.delete('/list/:id/delete/:movie_id', (req, res) => {
    //res.send("Endpoint para eliminar peliculas a una lista: " + JSON.stringify(req.params));
    moviesMethods.deleteMovie(req, res);
});

//Endpoint para calificar listas de otros usuarios
router.put('/list/:id/rate', (req, res) => {
    moviesMethods.rateUser(req, res);
});

module.exports = router;
