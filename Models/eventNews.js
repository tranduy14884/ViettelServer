const mongoose = require('mongoose');
const modelEventNews = new mongoose.Schema({
    title : String,
    thumnailUrl : String,
    content : String
},{
    collection : 'eventNews'
});

const EventNews = mongoose.model('eventNews',modelEventNews);
module.exports = EventNews;