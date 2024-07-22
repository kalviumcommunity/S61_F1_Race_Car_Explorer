const mongoose = require('mongoose');

// Define the schema for the Car collection
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, "invalid email"]
    },
    password: {
        type: String,
        require: [true, "invalid password"]
    }
});

const UserModal = mongoose.model('user', userSchema)

// Export the schemas
module.exports = { UserModal }