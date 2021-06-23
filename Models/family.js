const mongoose = require('mongoose');
const familySchema = new mongoose.Schema({
    name: String,
    speed: String,
    price: Number,
    halfYear: Number,
    fullYear: Number
}, {
    collection: 'family'
}
);
const Family = mongoose.model('family', familySchema);
module.exports = Family;