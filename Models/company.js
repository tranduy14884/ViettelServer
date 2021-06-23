const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    name: String,
    speed: String,
    price: Number,
    Ip: Number,
    IpL: Number,
    halfYear: Number,
    fullYear: Number,
    raderFullYear: Number
},
    {
        collection: 'company'
    });

const Company = mongoose.model('company', companySchema);
module.exports = Company;
