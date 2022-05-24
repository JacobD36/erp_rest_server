const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    name1: {
        type: String,
        required: [true, 'El primer nombre es obligatorio']
    },
    name2: {
        type: String
    },
    lastName1: {
        type: String,
        required: [true, 'El primer apellido es requerido']
    },
    lastName2: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    google: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    birthDate: {
        type: Date
    },
    img: {
        type: String,
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    modifiedAt: {
        type: Date,
        default: new Date()
    }
});

UsersSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', UsersSchema);