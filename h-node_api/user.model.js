const mongoose = require('mongoose');

const Users = mongoose.model('User', {
    username: {type: String, required: true, minLength: 3},
    lastname: {type: String, required: true,  minLength: 3},
});

module.exports = Users;