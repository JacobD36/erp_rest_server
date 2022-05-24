const generateJWT = require('./genJWT');
const googleVerify = require('./google-verify');

module.exports = {
    ...generateJWT,
    ...googleVerify
}