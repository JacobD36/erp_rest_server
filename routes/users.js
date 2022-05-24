const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost } = require('../controllers/users');
const { isValidRol, emailExist, userIDExist, dniExist } = require('../helpers/db-validators');
const { validateFields, validateJWT } = require('../middlewares');
const router = Router();

router.get('/', usersGet);
router.post('/', [
    check('dni', 'El DNI es necesario').not().isEmpty(),
    check('dni', 'EL DNI ya existe').custom(dniExist),
    check('email', 'El correo no es válido').isEmail().custom(emailExist),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({ min: 6 }),
    check('name1', ' El primer nombre es necesario').not().isEmpty(),
    check('lastName1', 'El primer apellido es necesario').not().isEmpty(),
    //check('rol').custom(isValidRol),
    validateFields
], usersPost);

module.exports = router;