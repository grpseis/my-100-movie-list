const badNewUser = {
    "name": "Kadel Lacatt",
    "nickname": "klacatt4",
    "birthdate": "1981-09-25",
    "password": "12345"
}

const goodNewUser = {
    "email": "klacatt_004@hotmail.com",
    "name": "Kadel Lacatt",
    "nickname": "klacatt_004",
    "birthdate": "1981-09-25",
    "password": "12345"
}


const goodMovielist = {
    "name": "las mejores de federico",
    "owner": "federico",
    "rating": 8,
    "movies": [
            {
                "name": "Guardianes de la Galaxia",
                "year": 2018,
                "image": "ruta de la imagen"
            },
            {
                "name": "Star War - Guerra de los clones",
                "year": 2007,
                "image": "ruta de la imagen"
            },
            {
                "name": "Star War - El retorno del Jedi",
                "year": 2004,
                "image": "ruta de la imagen"
            }
]
}

const badMovielist = {
    "name": "las mejores de federico",
    "owner": "federico",
    "rating": 8
}
module.exports = {
    badNewUser,
    goodNewUser,
    goodMovielist,
    badMovielist
}