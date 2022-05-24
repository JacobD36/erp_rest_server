const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('dni', 'el DNI es obligarotorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token necesario ').not().isEmpty(),
    validateFields
], googleSignIn);

router.get('/', validateJWT, renewToken);

module.exports = router;