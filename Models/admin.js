const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
    phone : Number
}, {
    collection : 'admin'
});

const Admin = mongoose.model('admin',adminSchema);
module.exports = Admin;