const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    location: String,
    packet: String,
    status: Number
}, {
    collection: 'order'
});
const Order = mongoose.model('order', orderSchema);
module.exports = Order;