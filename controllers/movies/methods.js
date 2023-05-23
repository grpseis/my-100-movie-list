const movieList = require("../../models/movieList");
const { json } = require("express");

//Consultamos todas las listas de los usuarios
const allMovieslist = async (req, res) => {
    try {
        const lamov = await movieList.find();
        if (!lamov) throw new error('No hay listas de películas');
        res.json(lamov);
    } catch (error) {
        res.status(500).send("No hay listas de películas");
    }
}


// Consultamos todos las peliculas de un usuario
const oneMovieslist = async (req, res) => {
    try {
        const userName = req.params.id;
        const lamov = await movieList.findOne({owner : userName});
        if (!lamov) throw new error(`No hay listas de películas para el usuario ${userName}`);
        res.json(lamov.movies);
    } catch (error) {
        res.status(500).send(`No hay listas de películas para el usuario ${userName}`);
    }
}

//agregamos una lista de peliculas nueva
const registerMovie = async (req, res) => {
    try {
        const userName = req.params.id;
        const { body } = req;
        // verificamos que la lista de usuario ya exista
        const lamov = await movieList.findOne({owner : userName});
        // cargamos los nuevos datos
       if (!lamov) {
            const saveMovie = new movieList({
                name: body.name,
                owner: userName,
                rating: body.rating,
                //movies: movieIDs,
                movies: body.movies
            });
            await saveMovie.save();
            res.status(200).json(saveMovie);
        } else {
            lamov.movies= body.movies;
            updMovie = await movieList.findOneAndUpdate({owner : userName},
                lamov, {new: true});
            res.status(200).send({"Msg" : `La lista de películas para el usuario ${userName} ya existe, adicionamos sólo peliculas`});
        }

    }catch (error) {
        if (error.code === 11000) throw new error('No se pudo agregar la lista de películas');
        else throw error;
    }
};

/* const saveMovies = async () => {
     let MovieIDs = [];
     console.log("numero de peliculas",body.movies.length);
     for (let i = 0; i < body.movies.length; i++) {
         const el = body.movies[i];
         const newMovie = new movieList({
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
 console.log(movieIDs);  */





// elimminar una película de una lista
const deleteMovie = async (req, res) =>{
    try{
        const userName = req.params.id;
        const idPelicula = req.params.movie_id;
        const lamov = await movieList.findOne({owner : userName});
        if (!lamov)  throw new error(`No hay listas de películas para el usuario ${userName}`);
        const pelis = lamov.movies[idPelicula];
        lamov.movies.splice(idPelicula,1);
        updMovie = await movieList.findOneAndUpdate({owner: userName},
            lamov,
            {new: true});
        res.status(200).send({"Msg" : ` ${pelis.name}  ha sido eliminada de la lista`});
    } catch (e) {
        res.status(500).send({"Msg" : "Película no encontrada para eliminar"})
    }
}

const rateUser = async (req, res) => {
    try {
        const lamov = await movieList.find();
        const nroList = lamov.length
        if (!lamov) throw new error('No hay listas de películas');
        let sumaRate = 0;
        for (let i = 0; i < nroList; i++) {
             console.log(lamov.rating[i]);
             sumaRate += lamov.rating[i];
        }
        console.log(sumaRate);
        console.log(nroList);
        let promedio = sumaRate / nroList;

        console.log(promedio);
        lamov.rating = promedio;
        updRate = await movieList.findOneAndUpdate({owner: userName},
            lamov,
            {new: true});
        res.status(200).send({"Msg" : `El rating de ${userName}  ha sido actualizado a ${promedio}`});
    } catch (e) {
        res.status(500).send({"Msg" : "No se pudo hacer el rating"});
    }
}


module.exports =  { allMovieslist, oneMovieslist, registerMovie, deleteMovie, rateUser };