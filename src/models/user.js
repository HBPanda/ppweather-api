const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    address: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    telephoneNo: {type: String, required: true},
    role: {type: String, required: true},
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);