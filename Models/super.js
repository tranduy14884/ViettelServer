const mongoose = require('mongoose');
const superSchema = new mongoose.Schema({
    name: String,
    speed: String,
    price: Number,
    halfYear: Number,
    fullYear: Number,
    modem: Number,
    wifi: Number,
}, {
    collection: 'super'
})
const Super = mongoose.model('super', superSchema);
module.exports = Super;