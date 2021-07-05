const mongoose = require('mongoose');
const modelService = new mongoose.Schema({
    title : String,
    thumnailUrl : String,
    content : String
},{
    collection : 'service'
});

const Service = mongoose.model('service',modelService);
module.exports = Service;