const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const usersGet = async(req = reques, res = response) => {
    const { limit = 10, page = 1 } = req.query;
    const query = { status: 1 }

    const [total, users] = await Promise.all([
        User.countDocuments().where(query),
        User.find().skip(Number((page - 1) * Number(limit))).limit(Number(limit)).where(query)
    ]);

    res.json({
        total,
        users
    })
}

const usersPost = async(req = reques, res = response) => {
    const { dni, email, password, name1, lastName1, rol, ...body } = req.body;

    const data = {
        ...body,
        dni,
        email,
        password,
        name1,
        lastName1,
        rol
    }

    const user = new User(data);

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    //Guardar en BD
    await user.save();

    res.status(201).json({
        user
    });
}

module.exports = {
    usersGet,
    usersPost
}