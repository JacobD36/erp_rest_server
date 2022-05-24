const { request, response } = require('express');
const bcryptjs = require('bcrypt');
const User = require('../models/user');
const { generateJWT, googleVerify } = require('../helpers');

const login = async(req = request, res = response) => {
    const { dni, password } = req.body;

    try {
        //Verificar si el dni existe
        const user = await User.findOne({ dni });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        //Se verifica si el usuario está activo
        if (user.status == 0) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inhabilitado'
            });
        }

        //Verificar la contraseña
        const checkPassword = bcryptjs.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Por favor, pongase en contacto con el administrador'
        });
    }
}

const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { email, name, img } = await googleVerify(id_token);

        //Se verifica que el correo exista en la base de datos
        let user = await User.findOne({ email });

        //Si el correo no existe, se crea la cuenta
        if (!user) {
            const data = {
                name1: name,
                email,
                password: '***',
                img,
                rol: 'USER_ROLE',
                google: true
            }

            user = new User(data);
            user.save();
        }

        //Se verifica el estado del usuario en la BD
        if (user.status == 0) {
            return res.status(401).json({
                msg: 'Comuníquese con el administrador. Su usuario se encuentra inhabilitado'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'El token de Google no se pudo verificar'
        });
    }
}

const renewToken = async(req = request, res = response) => {
    const { user } = req;

    //Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
        user,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}