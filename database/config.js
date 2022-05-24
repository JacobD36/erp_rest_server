const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Database Online');
    } catch (error) {
        throw new Error('Database error connection');
    }
};

module.exports = {
    dbConnection
};