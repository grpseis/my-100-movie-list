const movieList = require("../../models/movieList");
const { json } = require("express");

// Listamos todos las listas de peliculas
const allMovieslist = async (req, res) => {
    try {
        const lamov = await movieList.find();
        if (!lamov) throw new error('No hay listas de películas');
        res.json(lamov);
    } catch (error) {
        res.status(500).send("No hay listas de películas");
    }
}


//agregamos una pelicula a una lista
const registerMovie = async (req, res) => {
    try {
        const { body } = req;
        const saveMovies = async () => {
            let MovieIDs = [];
            for (let i = 0; i < body.movies.length; i++) {
                const el = body.movies[i];
                const newMovie = new movies({
                    name: el.name,
                    year: el.year,
                    image: el.image
                });
                const savedMovies = await newMovie.save();
                movieIDs.push(saveMovies._id);
            }
            return movieIDs;
        };

        const movieIDs = await saveMovies();

        const movieLi = new movieList({
            name: body.name,
            owner: body.owner,
            rating: body.rating,
            movies: movieIDs,
        });

        const savedMovieli = await movieList.save();
        res.status(201).json(savedMovieli);
    }catch (error) {
        console.log(error);
        if (error.code === 11000) throw new error('Película no disponible');
        else throw error;
    }
};


// elimminar una película de una lista
const deleteMovie = async (req, res) =>{
    try{
        const fuser = await Movies.findOneAndDelete({nombre: req.body.nombre});
        if (fuser) res.status(200).send({"Msg" : "Película eliminada exitosamente"});
        else throw new error();
    } catch (e) {
        res.status(500).send({"Msg" : "Película no encontrada para eliminar"})
    }
}

module.exports =  { allMovieslist,  registerMovie };