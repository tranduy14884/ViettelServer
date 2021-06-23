const mongoose = require('mongoose');

const comboSchema = new mongoose.Schema({
    name: String,
    speed: String,
    price: Number,
    halfYear: Number,
    fullYear: Number,
    modem: Number,
    boxtv: Number
}, {
    collection: 'combo'
});

const Combo = mongoose.model('combo', comboSchema);
module.exports = Combo;
