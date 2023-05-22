const express = require('express');
const router = express.Router();
const accountsMethods = require('./methods');

router.post('/register', async (req, res) => {
    try {
        const user = await accountsMethods.registerUser(req.body);
        res.status(200).json({
            message: 'Usuario registrado exitosamente.',
            data: user
        });
    }catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login',async (req, res) => {
    
    const {email, password} = req.body;
    
    try {
        const accessToken = await accountsMethods.loginUser(email, password);
        if (!accessToken) throw new error('Token inválido.');
        res.status(200).json(accessToken);
    }catch (error) {
        res.status(404)
        .send("Nombre de usuario o contraseña incorrecta.");
    }
       
});


//Lista todos los usuarios
router.get('/movies/',async (req , res) => {
    accountsMethods.listUsers(req , res);    
});


//busca un usuario por su nickname
router.get('/finduser',async (req , res) => {
    accountsMethods.listoneUser(req, res);
})

//eliminamos un usuario
router.delete('/delete', async (req, res) =>{
    accountsMethods.deleteUser(req, res);
} )
module.exports = router;