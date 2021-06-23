const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/viettel`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
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
const family = mongoose.model('family', familySchema);
family.find({})
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });