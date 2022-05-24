const { is } = require('express/lib/request');
const { User, Role } = require('../models');

const isValidRol = async(rol = '') => {
    const rolExist = await Role.findOne({ rol });
    if (!rolExist) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const emailExist = async(email = '') => {
    //Verificar si el email existe
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`El correo ${email} ya se encuentra registrado`);
    }
}

const dniExist = async(dni = '') => {
    //Verificar si el DNI ya existe
    const dniExist = await User.findOne({ dni });
    if (dniExist) {
        throw new Error(`El DNI ${dni} ya se encuentra registrado`);
    }
}

const userIDExist = async(id) => {
    //Verificar si el id de usuario existe
    const idExist = await User.findById(id);
    if (!idExist) {
        throw new Error(`el ID ${id} no existe`);
    }
}

module.exports = {
    isValidRol,
    emailExist,
    userIDExist,
    dniExist
}