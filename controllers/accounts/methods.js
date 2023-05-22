const jwt = require("jsonwebtoken");
const User = require('../../models/users');
const { json } = require("express");

const createToken = async (user, role) => {
    const tokenPayload = {
        "username": user,
        "role": role
    }
    const token = await jwt.sign(
        tokenPayload, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_TTL}
    );

    return token;

}

const registerUser = async (payload) => {
    try {
        const newUser = new User(payload);
        await newUser.save();
        return newUser;
    }catch (error) {
        console.log(error);
        if (error.code === 11000) throw new error('Usuario no disponible');
        else throw error;
    }
};

const loginUser = async (username, password) => {

    const user = await User.findOne({ nickname: username });
    if (!user) throw new error('Usuario no encontrado.');

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new error('Contraseña invalida.');

    return await createToken(username, "normal");

};

const listUsers = async (req, res) => {
    try {
        const fuser = await User.find();
        if (!fuser) throw new error('No hay usuarios');
        res.json(fuser);
    } catch (error) {
        res.status(500).send("No hay usuarios");
    }
}


const listoneUser = async (req, res) => {
    try {
        const fuser = await User.findOne({nickname: req.body.nickname});
        if (fuser) res.status(200).json(fuser);
        else
            throw new error();
    } catch (error) {
          res.status(404).send({"Msg" : "Usuario no existe"});
    }
}

module.exports = { createToken, registerUser, loginUser, listUsers, listoneUser}