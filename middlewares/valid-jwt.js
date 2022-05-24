const { request, response } = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No se encontró el token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario inexistente'
            });
        }

        //Verificar si el usuario está activo en la base de datos
        if (usuario.status == 0) {
            return res.status(401).json({
                msg: 'Usuario inhabilitado'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token inválido'
        });
    }
};

module.exports = {
    validateJWT
}