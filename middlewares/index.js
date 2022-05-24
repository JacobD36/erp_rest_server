const validateFields = require('./valid-fields');
const validateJWT = require('./valid-jwt');

module.exports = {
    ...validateFields,
    ...validateJWT
}